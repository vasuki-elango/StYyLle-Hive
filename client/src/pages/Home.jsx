import React, { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { assets } from '../assets/data'

import axios from 'axios'
import { Banner } from '../components/Banner'

export const Home = () => {
  const [bestsellers,setBestseller] = useState([])
  const [LeastCollections,setLeastCollections] = useState([])

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/bestseller`).then((res)=>{
      setBestseller(res.data)
    }).catch((err)=>{
      console.log(err);
    })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/leastCollection`).then((res)=>{
      setLeastCollections(res.data)
    }).catch((err)=>{
      console.log(err);
    })

  },[])

  return (
    <div className='p-1'>
      {/* carousel */}
      <Banner/>
      
      <main className='container px-4 sm:px-[2vw] md:px-[3vw] lg:px-[5vw]'>
        {/* LeastCollections */}
        <div>
          <div className="text-center my-10">
            <h1 className='text-3xl pb-2'>Least Collection</h1>
            <p className='w-3/4 m-auto sm:text-sm text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo non dolorem impedit perferendis ex reiciendis!</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 gap-y-6">
            {
              LeastCollections.map((item,key)=><Card key={key} item={item}/>)
            }
          </div>
        </div>

        {/* Best seller */}
        <div>    
          <div className="text-center my-10">
            <h1 className='text-3xl pb-2'>BestSellers</h1>
            <p className='w-3/4 m-auto sm:text-sm text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo non dolorem impedit perferendis ex reiciendis!</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 gap-y-6">
            {
              bestsellers.map((item,key)=><Card key={key} item={item}/>)
            }
          </div>
        </div>

        {/* Offer content */}
        <div>
          <div className='relative rounded-md overflow-hidden mt-6'>
            <div className='h-80'>
              <img src={assets.discount_img} alt="" className='w-full h-full object-cover'/>
            </div>
            <div className="absolute top-16 left-3 lg:left-20 text-yellow-50 text-lg">
              <h3 className='font-medium text-3xl'>30%off for</h3>
              <h4 className='font-medium text-3xl'>summar special day</h4>
              <p className='text-sm w-1/2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, fugit?</p>
              <button className='btn btn-dark my-3'>shop now</button>
            </div>
          </div>
        </div>
        
        {/* News letter  */}
        <div className="text-center my-10  h-72 flex justify-center content-center flex-col rounded-lg">
          <h2 className='text-4xl'>News Letter</h2>
          <p className='font-sm p-1'>Lorem. Incidunt nulla doloribus numquam temporciendis tempora voluptas enim nisi.</p>
          <form action="" className='mt-4 flex justify-center'>
            <input type="text" placeholder="Your Email" className='border-2 ps-3 pe-8 py-2 outline-none border-gray-600 m-0' />
            <button className='border-none px-7 bg-gray-700 hover:bg-slate-800'>Send</button>
          </form>
        </div>
    </main>
    </div>
  )
}
