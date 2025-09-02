import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProtectedRouteUser from '../context/AuthContext'
import ProtectAuthRoute from '../components/protectedRoute/UserProtectedRoute'
import UserDetail from '../components/UserDetail'

const Router = () => {
    return (
        <Routes>
            <Route element={<ProtectedRouteUser />}>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/user/:id' element={<UserDetail/>}/>
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
        </Routes>
    )
}

export default Router
