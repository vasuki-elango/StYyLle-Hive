import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Users = () => {
  const [users,setUser] = useState([])
  const admintoken = localStorage.getItem('admintoken')
  const navigate = useNavigate()

  useEffect(()=>{
    if (!admintoken) {
      navigate('/admin/login')
      return
    }
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/user`,{
      headers:{
        Authorization:`Bearer ${admintoken}`
      }
    }).then(res=>setUser(res.data)).catch(err=>{
      console.log(err)
  })
  },[admintoken,users,navigate])

  const handleDelete = (id) =>{
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/user/delete/${id}`,{
      headers:{
        Authorization:`Bearer ${admintoken}`
      }
    })
  }

  return (
    <div className='container'>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div  className="overflow-hidden">      
        <table className="w-full table-auto border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Customer_Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user._id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                <button className='text-red-500 hover:underline mr-2' onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
