const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const Cart = require('../models/CartSchema')

router.get('/get', auth, async (req, res) => {
    const userId = req.userId;
    try {
        let cart = await Cart.findOne({ userId }).populate('items.productId')
        if (!cart) {
            return res.status(200).json({ items: [] }); // Return empty cart if not found
        }
        res.status(200).json({ items: cart.items})
    }
    catch (err) {
        res.status(400).json({mesage:err})
    }
})

router.post('/add', auth, async (req, res) => {
    const userId = req.userId; // comes from JWT    
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId })
        if (cart) {
            // cart is exits 
            const index = cart.items.findIndex(item => item.productId === productId)
            if (index !== -1) {
                cart.items[index].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }
        else {
            cart = new Cart({ userId, items: [{ productId, quantity }] })
        }
        cart.save()
    }
    catch (err) {
        res.status(400).json({mesage:err})
    }
})

router.put('/decrease', auth, async (req, res) => {
    const userId = req.userId;
    const { productId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if(cart){
            const index = cart.items.findIndex(item=>item.productId===productId._id)
            if(cart.items[index].quantity!==1){
                cart.items[index].quantity -= 1
            }
            else{
                cart.items = cart.items.filter(item => item.productId !== productId._id)
            }
        }
        await cart.save();
        
        res.status(200).json({ message: "Item removed", items: cart.items });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.delete('/remove/:productId',auth,async(req,res)=>{
    const userId = req.userId
    const {productId} = req.params
    try{
        const cart = await Cart.findOne({userId})
        cart.items = cart.items.filter(item => item.productId != productId);
        await cart.save();
    }
    catch(err){
        res.status(500).json({ message: err });
    }
})

router.delete('/remove',auth,async(req,res)=>{
    const userId = req.userId;

    try{
        await Cart.deleteMany({userId})
        res.status(200).json({message:"cart cleared"})
    }
    catch(err){
        res.status(500).json({message:"not found"})
    }
})

module.exports = router