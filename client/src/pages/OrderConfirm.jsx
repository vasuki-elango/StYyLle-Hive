import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/data';

export const OrderConfirm = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        const timer = setTimeout(() => {
            navigate('/order')
        }, 3000);

        return ()=>clearTimeout(timer)
    },[navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
        <div className='w-[200px] h-[200px]'>
            <img src={assets.orderconfirmed} alt="" />
        </div>
      <h1 className="text-4xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
      <p className="text-lg text-gray-700">Thank you for your purchase.</p>
      <p className="text-sm mt-2">Redirecting to your orders...</p>
    </div>
  )
}
