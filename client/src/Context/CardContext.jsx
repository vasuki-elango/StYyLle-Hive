import React, { createContext, useState, useCallback, useEffect } from 'react'
import axios from 'axios';
export const cartProvider = createContext();

export const CardContext = ({ children }) => {
    const [cartItem, SetCartItem] = useState([]);
    const token = localStorage.getItem('token');

    // show cartItems
    const fetchCart = useCallback(async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart/get`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) =>{ 
            SetCartItem(res.data.items)
        }).catch(err=>{
            console.log(err)
        })
    },[token])

    useEffect(()=>{
        fetchCart()
    },[fetchCart])

    // add cartItems
    const addToCart = async (item) => {
        try {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/add`, {
                productId: item._id,
                quantity: 1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        catch (err) {
            console.log(err);
        }
        await fetchCart()
    }

    // Decrease
    const DecreaseCart = async (productId) => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/cart/decrease`,
                {
                    productId
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (err) {
            console.error("Remove failed:", err);
        }

        await fetchCart()
    };

    // remove Cart
    const removeCart = async (productId) => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/cart/remove/${productId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            SetCartItem(res.data.cart.items);
        }).catch(err=>{
            console.log(err)
        })

    }

    return (
        <cartProvider.Provider value={{ cartItem, fetchCart, addToCart, DecreaseCart, removeCart ,SetCartItem }}>
            {children}
        </cartProvider.Provider>
    )
}
