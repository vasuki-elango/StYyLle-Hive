const express = require('express')
const router = express.Router()
const User = require('../models/UserSchema')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const key = process.env.JWT_SECRET_KEY

router.post('/signup',async(req,res)=>{
    const {name,email,password} = req.body
    try{
        const userExit = await User.findOne({email})
        if(userExit){
            return res.json({message:"Already Exits"})
        }
        console.log(password)
        const hashpassword = await bcryptjs.hash(password,10)
        const newUser = new User({name,email,password:hashpassword})
        await newUser.save()
        res.status(200).json({ message: 'User created successfully' })
    }
    catch(err){
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

router.post('/signin',async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user) return res.json({message:"User not found"})
            
        const isMatch = await bcryptjs.compare(password, user.password)
        if(!isMatch) return res.json({message:"Password Not valid"})
                
        const token = jwt.sign({id:user._id},key)
        res.status(200).json({token,user:{_id:user._id,name:user.name,email:user.email}})
    }
    catch(err){
        res.status(500).json({ message: err });
    }
})

module.exports = router