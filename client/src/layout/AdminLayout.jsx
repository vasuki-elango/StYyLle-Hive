import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../admin/Header'


export const AdminLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
