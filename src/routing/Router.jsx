import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import ProtectAuthRoute from '../components/protectedRoute/UserProtectedRoute'
import UserDetail from '../components/UserDetail'
import ProtectedRouteUser from '../context/AuthContext'
import ProtectedRouteAdmin from '../components/protectedRoute/AdminProtectedRoute'
import AdminLogin from '../pages/AdminLogin'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import FileUpload from '../pages/FileUpload'
import ProductList from '../pages/products/ProductList'
import ProductDetail from '../pages/products/ProductDetail'
import ProductCreate from '../pages/products/ProductCreate'
import ProductEdit from '../pages/products/ProductEdit'

const Router = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path='/' element={<MainLayout />}>
                <Route path='/products' element={<ProductList />} />
                <Route path='/products/:id' element={<ProductDetail />} />
                <Route path='/catalog' element={<ProductList />} />
                <Route path='/catalog/:id' element={<ProductDetail />} />
            </Route>

            {/* Authenticated user routes */}
            <Route element={<ProtectedRouteUser />}>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/user/:id' element={<UserDetail />} />
                    <Route path='/upload' element={<FileUpload />} />
                    {/* Product create/edit (auth required) */}
                    <Route path='/products/new' element={<ProductCreate />} />
                    <Route path='/products/:id/edit' element={<ProductEdit />} />
                </Route>
            </Route>

            {/* Admin-only placeholder */}
            <Route element={<ProtectedRouteAdmin />}>
                <Route path='/' element={<MainLayout />}>
                    {/* Add admin-only pages under here */}
                </Route>
            </Route>

            <Route
                path='/login'
                element={
                    <ProtectAuthRoute>
                        <Login />
                    </ProtectAuthRoute>
                }
            />
            <Route
                path='/register'
                element={
                    <ProtectAuthRoute>
                        <Register />
                    </ProtectAuthRoute>
                }
            />

            <Route path='/admin/login' element={
                <ProtectAuthRoute>
                    <AdminLogin />
                </ProtectAuthRoute>
            } />
        </Routes>
    )
}

export default Router
