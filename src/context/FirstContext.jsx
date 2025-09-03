import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FirstContext = createContext();

export const API_BASE = "http://localhost:8080";
export const IMAGE_BASE = `${API_BASE}/uploads`;

const AUTH_KEY = "auth"; // { token, isAuthenticated, user }

const FirstContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Users
  const [alluser, setAlluser] = useState();
  const [userById, setUserById] = useState();

  // Products
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);

  const navigate = useNavigate();

  // Initialize auth state from sessionStorage (preferred) or fallback to localStorage for backward compatibility
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.token) {
          setToken(parsed.token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
        }
        if (parsed?.user) setUser(parsed.user);
        if (parsed?.isAuthenticated) setIsAuthenticated(true);
      } else {
        // Backward compatibility with previous token/user keys
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (savedToken) {
          setToken(savedToken);
          axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
          setIsAuthenticated(true);
        }
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (_) {}
  }, []);

  // ===================== Auth & Users ===================== //
  const persistAuth = (next) => {
    // Persist in sessionStorage per spec
    try {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(next));
    } catch {}
  };

  const clearAuth = () => {
    try {
      sessionStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_KEY); // clear legacy
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {}
  };

  const login = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/user/login`, { email, password });
      const { token: newToken, user: loggedInUser, isAuthenticated: ok, message } = res.data;

      if (!ok || !newToken || !loggedInUser) {
        throw new Error(message || "Login failed");
      }

      // Save token/user in state
      setToken(newToken);
      setUser(loggedInUser);
      setIsAuthenticated(true);

      // Persist auth in sessionStorage as a single key
      persistAuth({ token: newToken, isAuthenticated: true, user: loggedInUser });

      // Set default header for axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      toast.success(message || "Logged in");
      return { token: newToken, user: loggedInUser };
    } catch (e) {
      setIsAuthenticated(false);
      setToken(null);
      setUser(null);
      clearAuth();
      const msg = e?.response?.data?.message || e.message || "Login error";
      toast.error(msg);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  // Server-side verification: hit admin-only endpoint
  const verifyAdmin = async () => {
    if (!token) return false;
    try {
      const res = await axios.get(`${API_BASE}/api/user/all`); // Authorization added via axios.defaults
      return res.status === 200;
    } catch (e) {
      if (e?.response?.status === 403) return false;
      return false;
    }
  };

  const register = async ({ email, username, phoneNumber, password, file }) => {
    const fd = new FormData();
    if (email) fd.append("email", email);
    if (username) fd.append("username", username);
    if (phoneNumber) fd.append("phoneNumber", phoneNumber);
    if (password) fd.append("password", password);
    if (file) fd.append("profileImage", file);

    const res = await fetch(`${API_BASE}/api/user/create`, {
      method: "POST",
      body: fd, // do not set Content-Type manually
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Registration failed");
    return data; // { message, user }
  };

  const updateProfileImage = async ({ userId, file }) => {
    if (!token) throw new Error("Not authenticated");
    const fd = new FormData();
    if (file) fd.append("profileImage", file);

    const res = await fetch(`${API_BASE}/api/user/update/${userId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Update failed");

    const updated = data?.updatedUser || data?.user; // support either shape

    // Update local user if the logged-in user updated themselves
    if (updated && user && (updated._id === user._id || updated.id === user.id)) {
      setUser(updated);
      // refresh persisted auth user
      persistAuth({ token, isAuthenticated: true, user: updated });
    }
    return data;
  };

  const getAllUsers = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE}/api/user/all`); // Authorization via defaults
      setAlluser(res.data.users);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (id) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const res = await axios.delete(`${API_BASE}/api/user/delete/${id}`); // Authorization via defaults
      toast.success(res.data.message);
      return res.data;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Delete failed");
      throw e;
    }
  };

  const updateUser = async (updateData) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const userId = updateData._id || updateData.id;
      let body = updateData;

      // If not FormData, convert to FormData for multipart per spec
      if (!(updateData instanceof FormData)) {
        const fd = new FormData();
        Object.entries(updateData || {}).forEach(([k, v]) => {
          if (k === "_id" || k === "id") return;
          if (v !== undefined && v !== null) fd.append(k, v);
        });
        body = fd;
      }

      const res = await axios.put(`${API_BASE}/api/user/update/${userId}`, body, {
        headers: {
          // Do NOT set Content-Type manually when sending FormData
        },
      });
      const updated = res?.data?.updatedUser || res?.data?.user;
      if (updated && user && (updated._id === user._id || updated.id === user.id)) {
        setUser(updated);
        persistAuth({ token, isAuthenticated: true, user: updated });
      }
      toast.success(res.data.message);
      return res.data;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Update failed");
      throw e;
    }
  };

  const getUserById = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/api/user/detail/${id}`);
      setUserById(res.data.user);
      return res.data.user;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to fetch user");
      throw e;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post(`${API_BASE}/api/user/logout`);
      }
    } catch (_) {
      // ignore optional logout errors
    }
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
    clearAuth();
    navigate("/login");
  };

  // ===================== Products ===================== //
  const fetchProducts = async () => {
    setProductLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/product/all`);
      setProducts(res.data.products || []);
      return res.data.products || [];
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load products");
      throw e;
    } finally {
      setProductLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    setProductLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/product/detail/${id}`);
      setProduct(res.data.product || null);
      return res.data.product;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Product not found");
      throw e;
    } finally {
      setProductLoading(false);
    }
  };

  const createProduct = async ({ name, price, description, category, stock, imageFile }) => {
    if (!token) throw new Error("Not authenticated");
    const fd = new FormData();
    if (name) fd.append("name", name);
    if (price !== undefined && price !== null) fd.append("price", String(price));
    if (description) fd.append("description", description);
    if (category) fd.append("category", category);
    if (stock !== undefined && stock !== null) fd.append("stock", String(stock));
    if (imageFile) fd.append("image", imageFile);
    try {
      const res = await axios.post(`${API_BASE}/api/product/new`, fd, {
        headers: {
          // Authorization set globally; do not set Content-Type for FormData
        },
      });
      toast.success(res.data.message || "Product created");
      return res.data.product;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Create failed");
      throw e;
    }
  };

  const updateProductApi = async (id, { name, price, description, category, stock, imageFile }) => {
    if (!token) throw new Error("Not authenticated");
    const fd = new FormData();
    if (name !== undefined) fd.append("name", name);
    if (price !== undefined) fd.append("price", String(price));
    if (description !== undefined) fd.append("description", description);
    if (category !== undefined) fd.append("category", category);
    if (stock !== undefined) fd.append("stock", String(stock));
    if (imageFile) fd.append("image", imageFile);
    try {
      const res = await axios.put(`${API_BASE}/api/product/update/${id}`, fd, {
        headers: {
          // Authorization set globally; do not set Content-Type for FormData
        },
      });
      toast.success(res.data.message || "Product updated");
      return res.data.product;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Update failed");
      throw e;
    }
  };

  const deleteProductApi = async (id) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const res = await axios.delete(`${API_BASE}/api/product/delete/${id}`);
      toast.success(res.data.message || "Product deleted");
      return res.data;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Delete failed");
      throw e;
    }
  };

  return (
    <FirstContext.Provider
      value={{
        // Auth
        isAuthenticated,
        isLoading,
        user,
        token,
        login,
        logout,
        register,
        updateProfileImage,
        verifyAdmin,

        // Users
        getAllUsers,
        alluser,
        deleteUser,
        updateUser,
        getUserById,
        userById,

        // Products
        products,
        product,
        productLoading,
        fetchProducts,
        fetchProductById,
        createProduct,
        updateProductApi,
        deleteProductApi,

        // Constants
        API_BASE,
        IMAGE_BASE,
      }}
    >
      {children}
    </FirstContext.Provider>
  );
};

export const useFirst = () => {
  const context = useContext(FirstContext);
  if (!context) throw Error("cannot be used withouut inside the provider");
  return context;
};

export default FirstContextProvider;
