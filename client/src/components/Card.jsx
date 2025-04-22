import React from 'react'
import { Link } from 'react-router-dom'

export const Card = ({item}) => {
  return (
    <Link to={`/product/${item._id}`} className='cursor-pointer text-gray-700 '>
      <div className='overflow-hidden rounded-md h-4/5'>
        <img src={item.image[0].startsWith('http') ? item.image[0] : `${process.env.REACT_APP_BACKEND_URL}/${item.image[0]}`} alt="" className='hover:scale-110 transition ease-in-out h-full w-full object-cover'/>
      </div>
      <p className='text-sm pt-2 pb-1'>{item.name}</p>
      <p className='text-sm'>₹{item.price}</p>
    </Link>   
  )
}
