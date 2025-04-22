import React, { useState ,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { assets } from '../assets/data';
import { toast } from 'react-toastify';
import { cartProvider } from '../Context/CardContext';
import {useContext} from 'react'


export const ProductDetails = () => {
  const {id} = useParams(); 
  const [product,setProducts] = useState(null)
  
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/${id}`)
    .then((res)=>{
      setProducts(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[id])
  
  const {addToCart} = useContext(cartProvider)

  if (!product) {
    return <p>Loading product details...</p>;
  }

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

  const handleCart = (item) =>{
    const token = localStorage.getItem('token')
    if(!token){
      toast.error("Please login",{
        autoClose:500
      })
    }
    else{
      addToCart(item);
      notify()
    }
  }
  const colors = [ "black", "#B9B28A", "#FDB7EA", "#7886C7"]

  return (
    <div className='flex container gap-5 content-center justify-center flex-col lg:flex-row p-1'>
    <div className='w-20 h-24 '>
      {
        product.image.map((item,key) => <img key={key} src={item.startsWith('http') ? item : `${process.env.REACT_APP_BACKEND_URL}/${item}`} alt={product.name} className='w-full h-full object-cover  border-solid border-gray-400 border p-1 mb-5'/>)
      }
    </div>
    <div className=' lg:w-1/3'>
      <img src={product.image[0].startsWith('http') ? product.image[0] : `${process.env.REACT_APP_BACKEND_URL}/${product.image[0]}`} alt={product.name} className='object-cover h-full w-full'/>
    </div>
    <div className='flex flex-col gap-2.5 p-2 w-full lg:w-4/12 lg:ms-6 '>
      <p>{product.category} / {product.subCategory}</p>
      <h1 className='text-3xl font-medium'>{product.name}</h1>
      <p className='text-xs'>{product.description}</p>
      <p className='text-2xl'>₹{product.price}</p>

      <div className='flex content-center gap-2'>
        <div className='bg-green-800 flex justify-center content-center gap-1 rounded-xl text-white px-3'>
          <p >3.8</p>
          <p className="bi bi-star-fill"></p>
        </div>
        <p>4.2 ratings & 4.1K reviews</p>
        {
          product.bestseller ? <img src={assets.discount} alt='' className='w-6 h-6'/> : ""
        }
      </div>
      <div className='flex justify-between content-center my-5 flex-col gap-3 sm:flex-row'>
        <div className='flex mb-4'>
        {
          product.sizes.map((item,key) => <p className='p-2 border border-gray-400 mx-1'key={key}>{item}</p>) 
        }
        </div>
        <div className='flex h-5'>
        {
          colors.map((item ,key)=> <p style={{backgroundColor:`${item}`}} className='p-5 mx-1' key={key}></p>) 
        }
        </div>
      </div>
      <div className='text-justify'>
        <h1 className='text-xl font-medium'>Available Offers</h1>
        <p className='mt-2'><i className='bi bi-tags-fill text-green-700'></i> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum quibusdam voluptas, aliquam </p>
        <p className='mt-1'><i className='bi bi-tags-fill text-green-700'></i> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum quibusdam voluptas, aliquam </p>
        <p className='mt-1'><i className='bi bi-tags-fill text-green-700'></i> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum quibusdam voluptas, aliquam </p>
        
        <p className='text-blue-700 font-semibold mt-2'>+8more offers</p>
        
      </div>
      <button className='bg-blue-300 py-2 rounded-lg hover:bg-blue-500' onClick={()=>handleCart(product)}>Add Cart</button>
    </div>
  </div>
  )
}
