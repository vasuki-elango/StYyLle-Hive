import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Signin = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signin`, user);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        toast.success("Signin successfully",{
          autoClose:500
        })
        navigate('/')
      }
      else {
        toast.error(res.data.message || "Invalid credentials",{
          autoClose:500
        });
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className='w-full max-w-sm p-8 border shadow-lg rounded  bg-white'>
        <h2 className='text-4xl mb-4 text-center'>Sign In</h2>
        <p className='text-center text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elite</p>
        <form action="" method="post" className='my-4' onSubmit={handleSubmit}>

          <label htmlFor='email'>Email </label>
          <input type="email" name="email" required className="block mb-2 p-2 w-full border" value={user.email} onChange={handleChange} />

          <label htmlFor='password'>Password </label>
          <input type="password" name="password" required className="block mb-2 p-2 w-full border" value={user.password} onChange={handleChange} />


          <button type='submit' className='bg-blue-500 text-white px-10 py-2 rounded-md cursor-pointer w-full my-6'>LogIn</button>

          <p className="text-sm text-center mt-2">
            Already have an account? <Link to={'/auth/signup'} className="text-blue-500">SignUp</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
