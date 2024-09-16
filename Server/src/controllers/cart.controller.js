const Cart = require('../models/cart.model')

const addToCart = async(req,res)=>{
    try{
        const {userId,productId,cartQuantity} = req.body;
        let cart = await Cart.findOne({userId,productId})

        if(cart){
            cart.cartQuantity+=parseInt(cartQuantity)
        }else{
            cart = new Cart({userId,productId,cartQuantity})
        }
        
        const savedCart = await cart.save();

        return res.status(200).json(savedCart)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getCartByUserId = async(req,res)=>{
    try{
        const userId = req.params.userId;
        const carts = await Cart.find({userId}).populate('productId')
        return res.json(carts)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const deleteCartById = async(req,res)=>{
    try{
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if(!cart){
            return res.status(404).json({message:"No cart found!"})
        }
        return res.status(200).json({message:"cart removed successfully"})
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const deleteAllCartsByUserId = async(req,res)=>{
    try{
        const userId = req.params.userId
        const result = await Cart.deleteMany({userId})
        return res.status(200).json({message:`${result.deleteCount} carts removed successfully!`})
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

module.exports = {
    addToCart,
    getCartByUserId,
    deleteCartById,
    deleteAllCartsByUserId
}