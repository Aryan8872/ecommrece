import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFirst } from '../../context/FirstContext'

const ProductDetail = () => {
  const { id } = useParams()
  const { product, fetchProductById, user } = useFirst()

  useEffect(() => {
    fetchProductById(id)
  }, [id])

  if (!product) return null

  return (
    <div className='p-4'>
      <Link to='/products' className='text-blue-600'>&larr; Back</Link>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          {product.image && (
            <img src={`http://localhost:8080${product.image}`} alt={product.name} className='w-full max-w-md object-cover rounded' />
          )}
        </div>
        <div>
          <h1 className='text-2xl font-bold mb-2'>{product.name}</h1>
          <div className='mb-2'>${product.price}</div>
          <div className='mb-4'>{product.description}</div>
          <div className='text-sm text-gray-600'>Category: {product.category || '-'}</div>
          <div className='text-sm text-gray-600'>Stock: {product.stock ?? '-'}</div>
          {(user) && (
            <Link to={`/products/${product.id || product._id}/edit`} className='inline-block mt-4 bg-yellow-500 text-white px-3 py-1 rounded'>Edit</Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
