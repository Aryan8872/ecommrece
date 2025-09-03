import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFirst } from '../../context/FirstContext'

const ProductEdit = () => {
  const { id } = useParams()
  const { fetchProductById, product, updateProductApi, deleteProductApi } = useFirst()
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '', stock: '' })
  const [imageFile, setImageFile] = useState(null)
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchProductById(id)
  }, [id])

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        price: product.price ?? '',
        description: product.description || '',
        category: product.category || '',
        stock: product.stock ?? '',
      })
    }
  }, [product])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('')
    try {
      const updated = await updateProductApi(id, {
        name: form.name,
        price: form.price !== '' ? Number(form.price) : undefined,
        description: form.description,
        category: form.category,
        stock: form.stock !== '' ? Number(form.stock) : undefined,
        imageFile,
      })
      navigate(`/products/${updated.id || updated._id}`)
    } catch (e) {
      setStatus(e?.response?.data?.message || e?.message || 'Update failed')
    }
  }

  const onDelete = async () => {
    if (!confirm('Delete this product?')) return
    try {
      await deleteProductApi(id)
      navigate('/products')
    } catch (e) {
      setStatus(e?.response?.data?.message || e?.message || 'Delete failed')
    }
  }

  if (!product) return null

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>Edit Product</h2>
      <form onSubmit={onSubmit} className='grid gap-3 max-w-md'>
        <input className='border p-2' placeholder='Name' name='name' value={form.name} onChange={onChange} />
        <input className='border p-2' placeholder='Price' name='price' value={form.price} onChange={onChange} type='number' min='0' step='0.01' />
        <input className='border p-2' placeholder='Category' name='category' value={form.category} onChange={onChange} />
        <input className='border p-2' placeholder='Stock' name='stock' value={form.stock} onChange={onChange} type='number' min='0' step='1' />
        <textarea className='border p-2' placeholder='Description' name='description' value={form.description} onChange={onChange} />
        <input type='file' accept='image/png,image/jpeg' onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        <div className='flex gap-2'>
          <button type='submit' className='bg-yellow-500 text-white px-3 py-1 rounded'>Save</button>
          <button type='button' className='bg-red-600 text-white px-3 py-1 rounded' onClick={onDelete}>Delete</button>
        </div>
        {status && <div className='text-sm text-red-600'>{status}</div>}
      </form>
    </div>
  )
}

export default ProductEdit
