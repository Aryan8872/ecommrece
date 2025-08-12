import FlashSale from '../components/FlashSale'
import Inputref from '../components/Inputref'
import Navbar from '../components/Navbar'
import SwiperComp from '../components/SwiperComp'
import { useFirst } from '../context/FirstContext'

const Home = () => {
  const {} = useFirst()
  return (
    <div>
      <Navbar/>
      <Inputref/>
      <SwiperComp />
      <FlashSale />

    </div>
  )
}

export default Home
