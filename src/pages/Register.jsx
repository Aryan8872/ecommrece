import React, { useState } from 'react'
import { useFirst } from '../context/FirstContext'

const Register = () => {
  const { register } = useFirst()
  const [form, setForm] = useState({ email: '', username: '', phoneNumber: '', password: '' })
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('')
    try {
      const data = await register({ ...form, file })
      setStatus('Registered successfully')
    } catch (e) {
      setStatus(e?.message || 'Register failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
      <form onSubmit={onSubmit} className='bg-[#181818] p-6 rounded-lg w-md text-white'>
        <h2 className='text-xl mb-4'>Create account</h2>
        <div className='flex flex-col gap-3'>
          <input className='p-2 rounded bg-[#111]' placeholder='Email' name='email' value={form.email} onChange={handleChange} />
          <input className='p-2 rounded bg-[#111]' placeholder='Username' name='username' value={form.username} onChange={handleChange} />
          <input className='p-2 rounded bg-[#111]' placeholder='Phone number' name='phoneNumber' value={form.phoneNumber} onChange={handleChange} />
          <input type='password' className='p-2 rounded bg-[#111]' placeholder='Password' name='password' value={form.password} onChange={handleChange} />
          <input type='file' accept='image/*' onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <button type='submit' className='bg-blue-500 hover:bg-blue-600 p-2 rounded'>Register</button>
          {status && <div className='text-sm'>{status}</div>}
        </div>
      </form>
    </div>
  )
}

export default Register
