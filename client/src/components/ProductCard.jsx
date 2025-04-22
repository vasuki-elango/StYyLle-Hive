import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { cartProvider } from '../Context/CardContext'

export const ProductCard = ({ item }) => {
  const navigate = useNavigate()

  const name = item.name.substring(0, 12) + "...";

  const imageSrc = item.image?.[0]?.startsWith('http')
  ? item.image[0]
  : `${process.env.REACT_APP_BACKEND_URL}/${item.image?.[0] || 'default.jpg'}`;


  const notify = () => {
    toast.success('Product Added', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      progress: undefined,
    });
  }
  const { addToCart } = useContext(cartProvider)
  const handleCart = (item) => {
    const token = localStorage.getItem('token')
    if (token) {
      addToCart(item);
      notify()
    }
    else {
      toast.error("Please Login",{
        autoClose:500
      })
      navigate('/auth/signin')
    }
  }

  return (
    <div>
      <Link to={`/product/${item._id}`} className='hover:cursor-pointer h-full'>
        <div className='overflow-hidden rounded-md h-3/4 '>
          <img
            src={imageSrc}
            alt={item.name}
            className='h-full w-full object-cover hover:scale-110 transition ease-in-out'
          />
        </div>
        <div className='py-2'>
          <h2 className='lg:text-lg text-sm'>{name}</h2>
          <div className='flex justify-between content-center py-1 text-sm lg:text-lg'>
            <p>₹{item.price}</p>
            <p ><i className="bi bi-star-half text-yellow-400 pe-1"></i>3.9</p>
          </div>
        </div>
      </Link>
      <button className='block bg-blue-500 w-full py-2 rounded-md text-white transition ease-in-out hover:bg-blue-900' onClick={() => handleCart(item)} >Buy now</button>
    </div>
  )
}
