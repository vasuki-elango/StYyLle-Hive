import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export const Header = () => {
    const navigate = useNavigate()

    // const userdata = localStorage.getItem('admin')
    // const user = JSON.parse(userdata)
    // const adminname = user.name



    const handleLogout = () => {
        localStorage.removeItem('admintoken')
        localStorage.removeItem('admin')
        navigate('/admin/login')
    }

    return (
        <header className=' w-full bg-white sticky top-0 z-10'>
            <nav className='flex justify-between content-center px-10 py-4 gap-3'>

                {/* Company Logo */}
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>

                {/* Navbar */}
                <div className='hidden sm:flex gap-5 text-lg '>
                    <NavLink to={'/admin/dashboard'}>DashBoard<hr className='w-10 h-[2px] bg-black text-center ' /></NavLink>
                    <NavLink to={'/admin/product/add'}>AddProduct<hr className='w-10 h-[2px] bg-black text-center ' /></NavLink>
                    <NavLink to={'/admin/order'}>Order <hr className='w-10 h-[2px] bg-black text-center ' /></NavLink>
                    <NavLink to={'/admin/user'}>User <hr className='w-10 h-[2px] bg-black text-center ' /></NavLink>
                </div>
                <div className='flex items-center gap-3'>

                {/* <p>{adminname}</p> */}
                <p className="px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                    >Logout</p>
                </div>
            </nav>
        </header>
    )
}
