import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/auth/login`, user)
      .then((res) => {
        localStorage.setItem('admintoken', res.data.token)
        localStorage.setItem('admin', JSON.stringify(res.data.admin))
        if(res.data.token) {
          navigate('/admin/dashboard')
        }
        else{
          navigate('/admin/login')
        }
      })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className='w-full max-w-sm p-8 border shadow-lg rounded  bg-white'>
        <h2 className='text-4xl mb-4 text-center'>Admin Sign In</h2>
        <p className='text-center text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elite</p>
        <form action="" method="post" className='my-4' onSubmit={handleSubmit}>

          <label htmlFor='email'>Email </label>
          <input type="email" name="email" required className="block mb-2 p-2 w-full border" value={user.email} onChange={handleChange} />

          <label htmlFor='password'>Password </label>
          <input type="password" name="password" required className="block mb-2 p-2 w-full border" value={user.password} onChange={handleChange} />


          <button type='submit' className='bg-blue-500 text-white px-10 py-2 rounded-md cursor-pointer w-full my-6'>LogIn</button>

        </form>
      </div>
    </div>
  )
}
