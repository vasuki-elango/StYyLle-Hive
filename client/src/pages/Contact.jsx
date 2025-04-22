import React from 'react'
import { assets } from '../assets/data'

export const Contact = () => {
  return (
    <div className='container px-4 grid grid-cols-1 h-full gap-16 place-items-center lg:grid-cols-2 lg:p-5'>
      <div className=''>
        <img src={assets.contact_img} alt="" />
      </div>

      {/* form for contact */}
      <div className=''>
        <h1 className='text-3xl pb-2 text-center'>Contact Us</h1>
        <p className='text-center text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, cupiditate consectetur! Fuga animi magnam amet quod </p>
        <form action="" className='w-full p-3'>
          <label htmlFor="name" className='block'> Name</label>
          <input type="text" name='name' className='border w-full p-2 my-2' />
          <label htmlFor="email" className='block'> Email</label>
          <input type="email" name='email' className='border w-full p-2 my-2' />
          <label htmlFor="" className='block'>Message</label>
          <textarea name="" id="" cols="20" rows="7" className='border w-full p-2 my-2'></textarea>
          <button type="submit" className='block bg-blue-500 text-white rounded-md w-full p-2 my-2 hover:bg-blue-600'>Submit</button>
        </form>
      </div>
    </div>
  )
}
