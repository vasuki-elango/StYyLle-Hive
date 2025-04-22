const express = require('express');
const Product = require('../models/ProductSchema');
const router = express.Router()
const upload = require('../middleware/multerConfi')

router.get('/leastCollection',async(req,res)=>{
    try{
        const products = await Product.find().sort({_id:-1}).limit(5)
        res.json(products)
    }
    catch(err){
        res.status(400).json({ error: err });
    }
})

router.get('/bestseller',async(req,res)=>{
    try{
        const products = await Product.find({bestseller:true}).limit(5)
        res.json(products)
    }
    catch(err){
        res.status(400).json({ error: err });
    }
})

router.get('/',async(req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products) 
    }
    catch(err){
        res.status(500).json({ message: err });
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
      } catch (err) {
        res.status(500).json({ message: err });
      }
})

module.exports = router