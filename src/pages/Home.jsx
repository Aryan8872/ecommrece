import FlashSale from '../components/FlashSale'
import Inputref from '../components/Inputref'
import Navbar from '../components/Navbar'
import SwiperComp from '../components/SwiperComp'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='p-3'>
        <Link to='/products' className='bg-green-600 text-white px-3 py-1 rounded'>Browse Products</Link>
      </div>
      <Inputref/>
      <SwiperComp />
      <FlashSale />

    </div>
  )
}

export default Home
