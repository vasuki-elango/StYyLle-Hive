const express = require('express')
const Orders = require('../models/OrderSchema')
const router = express.Router()
const auth = require('../middleware/auth')

//show all orders
router.get('/',auth,async(req,res)=>{
    try{
        const orders = await Orders.find()
        res.status(200).json(orders)
    }
    catch(err){
        res.status(400).json({message:err})
    }
})

// Update the status of an order
router.put('/:id',auth, async (req, res) => {
  const { id } = req.params 
  const {status} = req.body
  try {
    const updateOrder = await Orders.findByIdAndUpdate(id,{$set:{
        status:status
    }},{$new:true})
    res.status(200).json(updateOrder);

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Server error' });
  }
});


module.exports = router