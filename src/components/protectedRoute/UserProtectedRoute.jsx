import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useFirst } from '../../context/FirstContext'
import { useEffect } from 'react'

const UserProtectedRoute = () => {
    const { isAuthenticated } = useFirst()
    useEffect(()=>{
        console.log(isAuthenticated)
    },[isAuthenticated])

    if (!isAuthenticated) {
        return <Navigate to="/login"/>
    }
    return (
        <Outlet />
    )
}

export default UserProtectedRoute
