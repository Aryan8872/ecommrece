import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirst } from '../context/FirstContext'

const Navbar = () => {
  const { login, logout, isAuthenticated } = useFirst()
  const navigate = useNavigate()



  return (
    <div>
      <button onClick={() => login()}>Login button</button>
    </div>
  )
}

export default Navbar
