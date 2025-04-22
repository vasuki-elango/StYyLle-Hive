import React, { useContext ,useState} from 'react'
import { cartProvider } from '../Context/CardContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/data'
import axios from 'axios'

export const PlaceOrder = () => {
  const [paymentMethod,SetMethod] = useState("")
  const name = JSON.parse(localStorage.getItem('user'))
  const { cartItem, SetCartItem } = useContext(cartProvider)
  const navigate = useNavigate()

  const totalAmount = cartItem.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const handleChange = (e)=>{
    SetMethod(e.target.value)
  }

  const handleSumbit = () => {
    try {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/order/place`, {
        userId: name._id,
        items: cartItem.map((item) => ({
          productId: item.productId._id,
          name: item.productId.name,
          quantity: item.quantity,
          price: item.productId.price,
        })),
        totalAmount,
        paymentMethod
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then(() => {
          axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/cart/remove`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          SetCartItem([])
          navigate("/orderconfirmed")
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='min-h-screen container max-w-5xl mx-auto p-5 px-4'>
      <h2 className="text-xl font-semibold mb-4">Review & Place Order</h2>

      {/* shipping info */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h3 className="text-xl font-medium mb-2">Shipping Information</h3>
        <p>Name: {name.name}</p>
        <p>Address: 123 Main Street, Chennai, TN</p>
        <p>Phone: +91 9876543210</p>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h3 className="text-xl font-medium mb-2">Order Summary</h3>
        <ul>
          {cartItem.map(item => (
            <li key={item.productId._id} className="flex justify-between items-center border-b py-2 gap-4">
              <div className='w-[100px] h-[70px] md:w-[100px] md:h-[100px] lg:w-1/5 overflow-hidden '>
                <img src={item.productId.image} alt="" className='w-full h-full object-cover' />
              </div>
              <span className='md:text-xl'>{item.productId.name} × {item.quantity}</span>
              <span className='md:text-xl'>₹{item.productId.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold mt-4">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
        <div className='flex items-center gap-12'>
          <label htmlFor="" className=' gap-2 flex'>
            <input type="radio" name="method" value="Cash on Delivery" onChange={handleChange} />
            <p>Cash on Delivery</p>
          </label>

          <label htmlFor="" className='w-[62px] gap-2 flex'>
            <input type="radio" name="method" value="Stripe" onChange={handleChange}/>
            <img src={assets.Stripe} alt="" className='rounded-sm' />
          </label>

          <label htmlFor="" className='w-[62px] flex gap-2'>
            <input type="radio" name="method" value="Paypal" onChange={handleChange} />
            <img src={assets.paypal} alt="" />
          </label>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="text-right">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition" onClick={handleSumbit}>
          Place Order
        </button>
      </div>
    </div>
  )
}
