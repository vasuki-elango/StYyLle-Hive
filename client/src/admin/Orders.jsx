import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Orders = () => {
  const [orders, Setorder] = useState([])
  const admintoken = localStorage.getItem('admintoken')
  const navigate = useNavigate()

  useEffect(() => {
    if (!admintoken) {
     navigate('/admin/login')
     return
    }
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/order/`,{
      headers:{
        Authorization:`Bearer ${admintoken}`
      }
    })
      .then((res) => {
        Setorder(res.data)
      }).catch(err=>{
        console.log(err)
    })
  },[admintoken,navigate])

  const updateStatus = (orderId, newStatus) => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/admin/order/${orderId}`,{status:newStatus},{
      headers:{
        Authorization:`Bearer ${admintoken}`
      }
    })
  };

  return (
    <div className="p-4  container max-w-7xl min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <div  className="overflow-hidden">      
        <table className="w-full table-auto border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">{order._id}</td>
                <td className="p-3">{order.userId}</td>
                <td className="p-3">{order.createdAt}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${order.status === 'Shipped'
                        ? 'bg-green-200 text-green-700'
                        : 'bg-yellow-200 text-yellow-800'
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">₹{order.totalAmount}</td>
                <td className="p-3">{order.paymentMethod}</td>
                <td className="p-3 space-x-2">
                  {/* Status dropdown */}
                  <select
                    className="px-3 py-1 border rounded"
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
