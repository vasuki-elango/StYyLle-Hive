import React from 'react'
import { Route, Routes } from 'react-router-dom'

//user pages
import { Home } from './pages/Home'
import { Collection } from './pages/Collection'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Error } from './pages/Error'
import { ProductDetails } from './pages/ProductDetails'
import { Cart } from './pages/Cart'
import { Order } from './pages/Order'
import { PlaceOrder } from './pages/PlaceOrder'
import { Profile } from './pages/Profile'
import { SignUp } from './pages/SignUp'
import { Signin } from './pages/Signin'
import { OrderConfirm } from './pages/OrderConfirm'

// admin pages
import { DashBoard } from './admin/DashBoard'
import { Users } from './admin/Users'
import { Orders } from './admin/Orders'
import { AddProduct } from './admin/AddProduct'
import { EditProduct } from './admin/EditProduct'
import { Login } from './admin/Login'

// layout
import { MainLayout } from './layout/MainLayout'
import { AdminLayout } from './layout/AdminLayout'

export const Allroutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/orderconfirmed' element={<OrderConfirm/>}/>
      </Route>

      <Route path='/auth'>
      <Route path='signup' element={<SignUp />} />
      <Route path='signin' element={<Signin />} />
      </Route>

      <Route path='/admin' element={<AdminLayout/>}>
        <Route path='dashboard' element={<DashBoard/>}/>
        <Route path='product/add' element={<AddProduct/>}/>
        <Route path="product/edit/:id" element={<EditProduct/>}/>
        <Route path='user' element={<Users/>}/>
        <Route path='order' element={<Orders/>}/>
      </Route>
        <Route path='admin/login' element={<Login/>}/>

      <Route path="*" element={<Error />} />
    </Routes>

  )
}
