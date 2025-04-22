import React from 'react'
import { assets } from '../assets/data'
import { persons } from '../assets/data'

export const About = () => {
  return (
    <div className='container p-2 px-4'>
      {/* about content */}
      <h2 className='text-center text-4xl mb-4'>About Us</h2>
      <div className='text-justify lg:flex lg:gap-6 justify-center'>
        <div className='h-4/6 lg:w-2/5'>
          <img src={assets.about_img} alt="about_img" className='h-full  w-full' />
        </div>
        <div className='lg:w-2/5'>
          <p className='py-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur recusandae illo et eum rerum quisquam, magnam rem sapiente nam nisi pariatur eos vel laborum. Odio veritatis quisquam neque incidunt ad aperiam culpa dignissimos autem impedit voluptas sint vero repellat labore deserunt et voluptatem ab provident quasi fugit explicabo aliquid, Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur recusandae illo et eum rerum quisquam, magnam rem sapiente nam nisi pariatur eos vel laborum. Odio veritatis quisquam neque incidunt ad aperiam culpa dignissimos autem impedit voluptas sint vero repellat labore deserunt et voluptatem ab provident quasi fugit explicabo aliquid, rrerum hic soluta. Obcaecati ad eum voluptate unde, distinctio vel quibusdam doloremque dolor! Incidunt fugit veniam non, nihil nisi id voluptatibus. Alias optio, cumque necessitatibus nisi repellendus accusantium rerum, neque aspernatur praesentium dolorum odit sed provident dolor quam in doloremque voluptatibus mollitia animi ut recusandae veritatis. Voluptatibus numquam mollitia veritatis molestiae?</p>
        </div>

      </div>

      {/* our customer's */}
      <div className='mt-5'>
        <h2 className='text-center text-4xl mb-4 '>Our Customer's</h2>
        <div className='grid grid-cols-1 text-center rounded-lg sm:grid-cols-2 md:grid-cols-3'>
          {
            persons.map((person) => {
              return <div key={person._id} className='border border-solid p-5 m-3 '>
                <div className='flex content-center justify-between md:flex-row '>
                  <div className='w-14 h-14 rounded-full overflow-hidden'>
                    <img src={person.img} alt="person1" className='w-full h-full object-cover' />
                  </div>
                  <div className='text-left'>
                    <h2 className='font-semibold'>{person.name}</h2>
                    <p className='text-xs'>{person.brand}</p>
                  </div>
                </div>
                <p className='bi bi-star-fill text-yellow-400'> 4.5</p>
                <p>{person.reviews}</p>
              </div>

            })
          }
        </div>
      </div>
    </div>
  )
}
