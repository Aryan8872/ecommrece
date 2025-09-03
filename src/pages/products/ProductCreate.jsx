import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirst } from '../../context/FirstContext'

const ProductCreate = () => {
  const { createProduct, isAuthenticated } = useFirst()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '', stock: '' })
  const [imageFile, setImageFile] = useState(null)
  const [status, setStatus] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      setStatus('Please login')
      return
    }
    setStatus('')
    try {
      const product = await createProduct({
        name: form.name,
        price: Number(form.price),
        description: form.description,
        category: form.category,
        stock: form.stock !== '' ? Number(form.stock) : undefined,
        imageFile,
      })
      navigate(`/products/${product.id || product._id}`)
    } catch (e) {
      setStatus(e?.response?.data?.message || e?.message || 'Create failed')
    }
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>Create Product</h2>
      <form onSubmit={onSubmit} className='grid gap-3 max-w-md'>
        <input className='border p-2' placeholder='Name' name='name' value={form.name} onChange={onChange} />
        <input className='border p-2' placeholder='Price' name='price' value={form.price} onChange={onChange} type='number' min='0' step='0.01' />
        <input className='border p-2' placeholder='Category' name='category' value={form.category} onChange={onChange} />
        <input className='border p-2' placeholder='Stock' name='stock' value={form.stock} onChange={onChange} type='number' min='0' step='1' />
        <textarea className='border p-2' placeholder='Description' name='description' value={form.description} onChange={onChange} />
        <input type='file' accept='image/png,image/jpeg' onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        <button type='submit' className='bg-blue-500 text-white px-3 py-1 rounded'>Create</button>
        {status && <div className='text-sm text-red-600'>{status}</div>}
      </form>
    </div>
  )
}

export default ProductCreate
