import React, { useContext, useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/data'
import { cartProvider } from '../Context/CardContext'

export const Header = () => {
  const { cartItem } = useContext(cartProvider)
  const [userName, setUsername] = useState(null)
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    const userdata = localStorage.getItem('user')
    if (userdata) {
      const user = JSON.parse(userdata)
      setUsername(user)
    }
  }, [])
  
  const Cartlength = cartItem.length
  useEffect(()=>{
    console.log(Cartlength)
  },[Cartlength])


  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/auth/signin');
  };

  return (
    <header className=' w-full bg-white sticky top-0 z-10'>
      <nav className='flex justify-between content-center px-10 py-4 gap-3'>

        {/* Company Logo */}
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        {/* Navbar */}
        <div className='hidden sm:flex gap-4 text-lg '>
          <NavLink to={'/'}>Home <hr className='w-10 h-[2px] bg-black text-center ' /></NavLink>
          <NavLink to={'/collection'}>Collection <hr className='w-10 h-[2px] bg-black text-center ' /></NavLink>
          <NavLink to={'/about'}>About <hr className='w-10 h-[2px] bg-black text-center ' /></NavLink>
          <NavLink to={'/contact'}>Contact <hr className='w-10 h-[2px] bg-black text-center ' /></NavLink>
        </div>

        <div className='flex items-center gap-5'>
          <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' />
          <Link to={'/cart'} className='relative' onClick={() => navigate('/cart')}>
            <img src={assets.cart_icon} alt="" className='w-5' />
            <p className='absolute right-[-5px] bottom-[-5px] bg-black text-white rounded-full w-4 leading-4 text-[10px] text-center aspect-square'>{Cartlength}</p>
          </Link>

          {/* dropdown */}
          <div className="relative inline-block text-left">
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              <img src={assets.profile_icon} alt="Profile" className="w-5 rounded-full" />
            </div>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-10">
                <div className="py-2">
                  {
                    userName ? <p className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={()=>navigate('/profile')}>{userName.name}</p> : <p className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={()=>navigate('/auth/signin')}>My Profile</p>
                  }
                  <p className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={()=>navigate('/order')}>My Orders</p>
                  <p
                    className="px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >Logout</p>
                </div>
              </div>
            )}
          </div>

          <img src={assets.menu_icon} alt="" className='w-5 sm:hidden' onClick={() => setVisible(true)} />

          {/* Mobile Navbar */}
          <div className={`fixed top-0 bottom-0 right-0 overflow-hidden bg-white transition-all duration-300 ease-in-out ${visible ? 'w-full z-[999]' : 'w-0 z-[999]'}`}>
            <div className='flex flex-col p-4 ' >
              <div onClick={() => setVisible(false)} className='flex items-center gap-2 pb-2'>
                <img src={assets.dropdown_icon} alt="" className='w-3' />
                <p>Back</p>
              </div>
              <NavLink className="py-2 border pl-6" onClick={() => setVisible(false)} to={'/'}>Home</NavLink>
              <NavLink className="py-2 border pl-6" onClick={() => setVisible(false)} to={'/collection'}>Collection</NavLink>
              <NavLink className="py-2 border pl-6" onClick={() => setVisible(false)} to={'/about'}>About </NavLink>
              <NavLink className="py-2 border pl-6" onClick={() => setVisible(false)} to={'/contact'}>Contact</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
