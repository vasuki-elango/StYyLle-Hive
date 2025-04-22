const express = require('express')
const router = express.Router()
const Admin = require('../models/AdminSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const key = process.env.JWT_SECRET_KEY

router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try{
        const admin = await Admin.findOne({email})
        if(!admin) return res.json({message:"User not found"})
        
        const isMatch = await bcrypt.compare(password, admin.password)
        if(isMatch) return res.json({message:"Password Not valid"})

        const token = jwt.sign({id:admin._id},key)
        res.status(200).json({token,admin:{_id:admin._id,name:admin.name,email:admin.email}})

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: err });
    }
})

module.exports = router