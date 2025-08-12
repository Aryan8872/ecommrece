import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import UserProtectedRoute from '../components/protectedRoute/UserProtectedRoute'

const Router = () => {
    return (
        <Routes>
            <Route element={<UserProtectedRoute/>}>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='register' element={<Register />} />

                </Route>
            </Route>

            <Route path='/login' element={<Login />} />


        </Routes>
    )
}

export default Router
