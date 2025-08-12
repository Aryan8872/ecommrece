import { Outlet } from 'react-router-dom'
import { useFirst } from '../../context/FirstContext'
import Footer from '../Footer'
import TopOffer from '../TopOffer'

const MainLayout = () => {
  const { isAuthenticated } = useFirst()
  console.log(isAuthenticated)


  return (
    <div>
      <TopOffer />

      <div>
        <Outlet />
      </div>

      <Footer />

    </div>
  )
}

export default MainLayout
