const Order = require('../models/order.model')

const createOrder = async(req,res)=>{
    try{
        const {userId,products,totalAmount,shippingAddress,shippingAddressGoogleMaps,contactNumber} = req.body

        const newOrder = new Order({userId,products,totalAmount,shippingAddress,shippingAddressGoogleMaps,contactNumber})
        console.log(newOrder)
        const savedOrder = await newOrder.save();

        return res.status(200).json(savedOrder)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getOrderByUserId = async(req,res)=>{
    try{
        const userId = req.params.userId
        const orders = await Order.find({userId}).populate('products.productId').populate('userId')
        console.log(orders)
        return res.json(orders)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getAllOrders = async(req,res)=>{
    try{
        const orders = await Order.find().populate('products.productId').popultate('userId')
        return res.json(orders)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const updateOrder = async(req,res)=>{
    try{
        const updatedOrders = await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updatedOrders){
            return res.status(404).json({message:"No orders found!"})
        }
        return res.status(201).json(updatedOrders)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const deleteOrder = async(req,res)=>{
    try{
        const orders = await Order.findByIdAndDelete(req.params.id);
        if(!orders){
            return res.status(404).json({message:"No orders found!"})
        }
        return res.status(201).json({message:"Orders deleted successfully!"})
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

module.exports = {
    createOrder,
    getOrderByUserId,
    getAllOrders,
    updateOrder,
    deleteOrder
}