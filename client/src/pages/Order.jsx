import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Order = () => {
  const [orders, Setorders] = useState([])
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/order/myorder`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      Setorders(res.data);
    })
  }, [])

  return (
    <div className="container mx-auto p-5 max-w-5xl min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={order._id} className="bg-white shadow p-4 rounded mb-4">
            <h3 className="font-semibold mb-2">Order #{index + 1}</h3>
            <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
            <ul className="mt-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between py-1 border-b">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>
            <div className="font-bold text-right mt-2">Total: ₹{order.totalAmount}</div>
            <div className='flex items-center justify-between my-2'>
              <p>Status:
                <span className={`p-1 px-3 ml-1 rounded-full text-sm ${order.status === 'Shipped'? 'bg-green-200 text-green-700': 'bg-yellow-200 text-yellow-800'}`}>
                  {order.status}
                </span>
              </p>
              <p className="font-bold text-right">{order.paymentMethod}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
