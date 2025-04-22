import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/data';
import { cartProvider } from '../Context/CardContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { fetchCart, cartItem, addToCart, DecreaseCart, removeCart } = useContext(cartProvider)
  const navigate = useNavigate()

  const totalAmount = cartItem.reduce((acc, item) => {
    return acc + item.productId.price * item.quantity;
  }, 0);

  const notify = (item) => {
    toast.error("Product Deleted", {
      autoClose: 500
    })
    removeCart(item.productId._id)
  }

  useEffect(()=>{
    fetchCart()
  },[fetchCart])

  return (
    <div className='container h-screen'>
      {
        cartItem.length === 0 ? <div className='flex justify-center items-center h-screen'>
          <h1 className='text-2xl text-red-600 font-bold'>Cart is Empty</h1>
        </div> : <div className='flex justify-center items-center flex-col px-4'>
          {/* cartItems */}
          <div className='flex w-full flex-col md:w-9/12'>
            {cartItem.map((item) => {
              return <div key={item.productId._id} className='flex items-center border justify-between  p-2 px-4 mt-1 gap-5'>
                <div className='w-24 h-24'>
                  <img src={item.productId.image} alt="" className='w-full h-full object-cover' />
                </div>
                <div className='gap-2'>
                  <p className='text-sm lg:w-[300px]'>{item.productId.name}</p>
                  <p className='text-sm'>$  {item.productId.price}</p>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                      <button className='bg-red-500 px-3 rounded-sm hover:bg-red-600' onClick={async () => await DecreaseCart(item.productId)}>-</button>
                      <p className=''>{item.quantity}</p>
                      <button className='bg-blue-300 px-3 rounded-sm hover:bg-blue-500' onClick={async () =>  await addToCart(item.productId)}>+</button>
                    </div>
                    <p>₹{item.quantity * item.productId.price}</p>
                  </div>
                </div>
                <div className=' w-5 lg:w-10'>
                  <img src={assets.cross_icon} alt="" className=' w-3 lg:w-5 hover:cursor-pointer hover:w-6' onClick={() => notify(item)} />
                </div>
              </div>
            })}
          </div>

          {/* Total Price */}
          <div className='flex justify-between border-b py-2 gap-2 w-full md:w-9/12'>
            <p className='font-semibold'>Total Item : {cartItem.length}</p>
            <p>₹{totalAmount}</p>
          </div>
          <button className='bg-yellow-300 w-full md:w-9/12 p-2 rounded-sm hover:bg-yellow-400 mt-' onClick={() => navigate('/placeorder')}>Next</button>
        </div>
      }
    </div>
  )
}
