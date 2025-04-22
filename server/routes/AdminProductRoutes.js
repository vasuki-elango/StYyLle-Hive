const express = require('express')
const router = express.Router()
const Product = require('../models/ProductSchema')
const upload = require('../middleware/multerConfi')
const auth = require('../middleware/auth')

//add Products
router.post('/add',upload.array('images'),async (req,res)=>{
    const {name,description,category,subCategory,bestseller,price,stock,sizes,image} = req.body
    const size = sizes ? sizes.split(',') : [];
    const imagePaths = req.files.map(file => file.path);
    try{
        const newProduct = new Product({
            name,
            description,
            category,
            subCategory,
            bestseller,
            price,
            stock,
            sizes:size,
            image:imagePaths
        })
        await newProduct.save()
        res.status(200).json({message:"Add successfully",product:newProduct})
    }
    catch(err){
        res.status(400).json({error:err})
    }
})

//delete Products
router.delete('/delete/:itemId',auth,async(req,res)=>{
    const {itemId} = req.params
    try{
        await Product.findByIdAndDelete(itemId)
        res.status(200).json({message:"Deleted successfully"})
    }
    catch(err){
        res.status(400).json({message:"id invalid"})
    }
})

//update products
router.put('/edit/:item_id',upload.array("images"),auth,async (req,res) => {
    const {item_id} = req.params
    const {name,description,category,subCategory,bestseller,price,stock,sizes,image} = req.body
    const size = sizes ? sizes.split(',') : [];
    const imagePaths = req.files.map(file => file.path);

    try{
        const Updateproduct = await Product.findByIdAndUpdate(item_id,{$set:{
            name,
            description,
            category,
            subCategory,
            bestseller,
            price,
            stock,
            sizes:size,
            image:imagePaths
        }},
        {new:true})
        res.status(200).json({message:"Updated Successfully"})
    }
    catch(err){
        res.status(400).json({error:err})
    }
})

module.exports = router