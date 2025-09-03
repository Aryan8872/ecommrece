import { useNavigate } from 'react-router-dom'
import { useFirst } from '../context/FirstContext'

const Navbar = () => {
  const { logout, isAuthenticated, user } = useFirst()
  const navigate = useNavigate()

  return (
    <div className='flex gap-3 p-2'>
      {!isAuthenticated ? (
        <>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
          <button onClick={() => navigate('/admin/login')}>Admin</button>
        </>
      ) : (
        <>
          <span>Hi {user?.username || user?.email}</span>
          <button onClick={() => navigate('/upload')}>Upload avatar</button>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  )
}

export default Navbar
