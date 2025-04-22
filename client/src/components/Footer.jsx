import React from 'react'
import  logo  from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { socialmedia } from '../assets/data'

export const Footer = () => {
  return (
    <footer className='bg-gray-200 grid grid-cols-2 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-7 '>
      <div className='w-7/12'>
        <img src={logo} alt="" />
        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur </p>
      </div>

      <div>
        <h2 className='font-medium'>Quick Links</h2>
        <div className='flex flex-col text-sm gap-2 mt-1'>
          <Link to={'/'}>Home</Link>
          <Link to={'/collection'}>Collections</Link>
          <Link to={'/about'}>About</Link>
          <Link to={'/contact'}>Contact Us</Link>
        </div>
      </div>

      <div>
        <h2 className='font-medium'>Links</h2>
        <div className='flex flex-col text-sm gap-2 mt-1'>
          <p>test 1</p>
          <p>test 1</p>
          <p>test 1</p>
          <p>test 1</p>
        </div>
      </div>

      <div>
        <h2 className='font-medium'>Links</h2>
        <div className='flex flex-col text-sm gap-2 mt-1'>
          <p>test 1</p>
          <p>test 1</p>
          <p>test 1</p>
          <p>test 1</p>
        </div>
      </div>
      
      <div>
        <h2 className='font-medium'>Subscribe Now</h2>
        <div className='flex my-2'>
          <input type="text" className='py-1 px-2 w-9/12' />
          <button className='bg-blue-500 px-3'>sumbit</button>
        </div>
        <p className='text-xs py-1'>Lorem ipsum dolor sit amet consectetur.</p>
        <div className='flex gap-4 mt-2 w-8'>
          {
            socialmedia.map((item,key)=><img src={item} alt='' key={key}/>)
          }
        </div>
      </div>
    </footer>
  )
}
