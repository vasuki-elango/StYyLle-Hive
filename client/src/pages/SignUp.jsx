import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export const SignUp = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (user.password !== user.confirmPassword) {
      toast.error("Password Not Match",{
        autoClose:500
      })
      return
    }

    try {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, user)
        .then(
          (res) => {
            toast.success(res.data.message,{
              autoClose:500
            })
            if (res.data.message === "User created successfully") {
              navigate('/auth/signin')
            }
          }
        )
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className='w-full max-w-sm p-8 border shadow-lg rounded mx-auto bg-white'>
        <h2 className='text-4xl mb-4 text-center'>Sign Up</h2>
        <p className='text-center text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elite</p>
        <form action="" method="post" className='my-4' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name </label>
          <input type="text" name="name" required className="block mb-2 p-2 w-full border" value={user.name} onChange={handleChange} />

          <label htmlFor='email'>Email </label>
          <input type="email" name="email" required className="block mb-2 p-2 w-full border" value={user.email} onChange={handleChange} />

          <label htmlFor='password'>Password </label>
          <input type="password" name="password" required className="block mb-2 p-2 w-full border" value={user.password} onChange={handleChange} />

          <label htmlFor='confirmPassword'>Confirm Password </label>
          <input type="password" name="confirmPassword" required className="block mb-2 p-2 w-full border" value={user.confirmPassword} onChange={handleChange} />

          <button type='submit' className='bg-blue-500 text-white px-10 py-2 rounded-md cursor-pointer w-full my-6'>Create Account</button>

          <p className="text-sm text-center mt-2">
            Already have an account? <Link to={'/auth/signin'} className="text-blue-500">SignIn</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
