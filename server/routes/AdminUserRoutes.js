const express = require('express')
const router = express.Router()
const User = require('../models/UserSchema')
const auth = require('../middleware/auth')

router.get('/',auth,async (req,res) => {
    try{
        const Alluser = await User.find()
        res.status(200).json(Alluser)
    }
    catch(err){
        res.status(400).json({message:err})
    }
})

router.delete('/delete/:id',auth,async (req,res) => {
    const id = req.params.id
    try{
       await User.findByIdAndDelete(id)
        res.status(200).json({message:"Deleted Successfully"})
    }
    catch(err){
        res.status(400).json({message:"Internal Server"})
    }
})

module.exports = router