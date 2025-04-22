import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const DashBoard = () => {
  const [products, SetProducts] = useState([])
  const navigate = useNavigate()

  const admintoken = localStorage.getItem('admintoken')

  const fetchProduct = ()=>{
    try {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/`).then((res) => {
        SetProducts(res.data)
      })
    } catch (error) {
      console.log(error)
    }
    
  }
  
  useEffect(() => {
    if (!admintoken) {
      navigate('/admin/login')
      return
     }
     document.title='StYyLle Hive-admin'
    fetchProduct()
  }, [navigate,admintoken])

  const handleDelete = async (itemId) => {
    alert("Confirm Delete")
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/product/delete/${itemId}`,{
      headers:{
        Authorization:`Bearer ${admintoken}`
      }
    })
    fetchProduct()
  }

  const handleEdit = (item) => {
    navigate(`/admin/product/edit/${item._id}`)
  }

  return (
    <div className='p-4 md:p-6 container max-w-7xl min-h-screen'>
      <h2 className='text-2xl font-bold mb-4'>Product List</h2>
      <table className='min-w-full bg-white border rounded'>
        <thead>
          <tr className='bg-gray-100 text-left'>
            <th className='p-2'>Image</th>
            <th className='p-2'>Name</th>
            <th className='p-2'>Price</th>
            <th className='p-2'>Category</th>
            <th className='p-2'>Stock</th>
            <th className='p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(prod =>
              <tr key={prod._id} className='border-t'>
                <td className='p-2'>
                  <img
                    src={
                      prod.image && prod.image[0]
                        ? prod.image[0].startsWith('http')
                          ? prod.image[0]
                          : `${process.env.REACT_APP_BACKEND_URL}/${prod.image[0]}`
                        : 'https://via.placeholder.com/64' 
                    }
                    alt={prod.name || 'Product Image'}
                    className="w-16 h-16 object-cover rounded"
                  />

                </td>
                <td className='p-2'>{prod.name}</td>
                <td className='p-2'>₹{prod.price}</td>
                <td className='p-2'>{prod.category}</td>
                <td className='p-2'>{prod.stock}</td>
                <td className='p-2'>
                  <button className='text-blue-500 hover:underline mr-2' onClick={() => handleEdit(prod)}>Edit</button>
                  <button className='text-red-500 hover:underline' onClick={() => handleDelete(prod._id)}>Delete</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
