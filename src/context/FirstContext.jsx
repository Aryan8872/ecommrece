import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FirstContext = createContext()

const FirstContextProvider = ({ children }) => {
    const [userRole, setUserRole] = useState("")   //ADMIN USER duita role 
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [alluser, setAlluser] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        getAllUsers()
    }, [])

    const login = async (userData) => {
        try {
            const loginreq = await axios.post("http://localhost:8080/api/user/login", userData)
            console.log(loginreq)
            setIsAuthenticated(true)
            toast.success(loginreq.data.message)
        }
        catch (e) {
            setIsAuthenticated(false)
            toast.error(e.response.data.message)
            console.log(e)
        }
    }
    const getAllUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/user/all")
            setAlluser(res.data.users)
        }
        catch (e) {
            console.log(e)
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/user/delete/${id}`)
            toast.success(res.data.message)
        } catch (e) {
            console.log(e)
        }
    }
    const updateUser = async (updateData) => {
        try {
            console.log(updateData)
            const res = await axios.put(`http://localhost:8080/api/user/update/${updateData._id}`,updateData)
            toast.success(res.data.message)
        }
        catch (e) {
            toast.error(e.response.data.message)
            console.log(e)
        }
    }

    const logout = () => {
        //do logout logic
        setIsAuthenticated(false)
        navigate("/login")
        localStorage.removeItem("authenticated")

    }

    return (
        <FirstContext.Provider value={{ isAuthenticated, login, logout, getAllUsers, alluser, deleteUser,updateUser }}>
            {children}
        </FirstContext.Provider>
    )

}

export const useFirst = () => {
    const context = useContext(FirstContext)
    if (!context) throw Error("cannot be used withouut inside the provider")
    return context
}

export default FirstContextProvider