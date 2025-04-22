const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Order = require('../models/OrderSchema')

router.post('/place',auth,async(req,res)=>{
    const userId = req.userId
    const {items,totalAmount,paymentMethod} = req.body
    try{
        const newOrder = new Order({
            userId:userId,
            items,
            totalAmount,
            paymentMethod
        })
        await newOrder.save();
        res.status(200).json({ message: "Order placed successfully" });
    }
    catch(err){
        res.status(400).json({message:"invalid",error:err})
    }  
})

router.get('/myorder',auth,async(req,res)=>{
    const userId = req.userId
    try{
        const myorder = await Order.find({userId}).sort({createdAt:-1})
        res.status(200).json(myorder)
    }
    catch(err){
        res.status(400).json({message:err})
    }
})

module.exports = router