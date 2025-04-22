import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { carouselItem } from '../assets/data';
import { useNavigate } from 'react-router-dom'


export const Banner = () => {
    const navigate = useNavigate();
    return (
    <section className='w-full'>
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showArrows={true}
      swipeable
      emulateTouch
      interval={4000}
      className='relative'
    >
      {
        carouselItem.map(item => (
          <div key={item.id} className='relative h-screen'>
            <img src={item.img} alt={item.title} className='w-full h-full object-cover' />
            <div className="absolute left-8 top-1/3 sm:left-16 md:left-32 text-left text-white z-10">
              <h3 className='font-bold text-5xl lg:text-7xl sm:text-6xl'>{item.title}</h3>
              <h4 className='font-bold text-3xl lg:text-5xl sm:text-4xl'>summar special day</h4>
              <p className='text-medium pt-2 w-3/4 sm:w-full'>{item.desc}</p>
              <button
                className='bg-slate-700 px-5 py-3 rounded-lg mt-4'
                onClick={() => navigate('/collection')}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))
      }
    </Carousel>
  </section>
  )
}
