import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFirst } from '../../context/FirstContext'

const ProductList = () => {
  const { products, fetchProducts } = useFirst()

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl'>Products</h2>
        <Link to='/products/new' className='bg-blue-500 text-white px-3 py-1 rounded'>New</Link>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products?.map((p) => (
          <Link key={p.id || p._id} to={`/products/${p.id || p._id}`} className='border rounded p-3 hover:shadow'>
            {p.image && (
              <img src={`http://localhost:8080${p.image}`} alt={p.name} className='h-32 w-full object-cover mb-2' />
            )}
            <div className='font-semibold'>{p.name}</div>
            <div className='text-sm'>${p.price}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList
