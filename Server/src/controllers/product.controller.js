const toSlug = require('../utils/helpers')
const uploadImageToCloudinary = require('../utils/fileUpload')
const Product = require('../models/product.model')

const createProduct = async(req,res)=>{
    try{
        const {name,price,description,category,quantity} = req.body
        const slug = toSlug(name)
        const file = req.file
        const imageUrl = await uploadImageToCloudinary(file)

        const product = new Product({name,price,description,category,quantity,slug,imageUrl})
        const resp = await product.save();

        const newProduct = await Product.findById(resp._id).populate('category')
        return res.status(200).json(newProduct)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getAllProducts = async(req,res)=>{
    try{
        const cid = req.query.cid || null
        const query = {}

        if(cid){
            query.category = cid
        }
        
        //below statement is flexible if we have a specified category then it will find all products only inside of that category
        const products = await Product.find({...query}).populate('category').populate('reviews')

        return res.status(201).json(products)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getProductById = async(req,res)=>{
    try{
        const productId = req.params.id

        const product = await Product.findById(productId).populate('category').populate('reviews')

        if(!product){
            return res.status(404).json({message:"product not found"})
        }
        return res.status(201).json(product)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const updateProduct = async(req,res)=>{
    try{
        const productId = req.params.id
        const file = req.file
        const imageUrl = null

        if(file){
            imageUrl = uploadImageToCloudinary(file)
        }

        if(imageUrl){
            req.body.imageUrl = imageUrl
        }

        req.body.slug = toSlug(req.body.name)
         
        // new is set to be true because findByIdAndUpdate by default returns the old instance
        const product = await Product.findByIdAndUpdate(productId,req.body,{
            new:true
        })

        if(!product){
            return res.status(404).json({message:'product not found'})
        }
        const updatedProduct = await product.populate('category')

        return res.status(200).json(updatedProduct)

    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const productId = req.params.id
        
        const product = await Product.findByIdAndDelete(productId)
        if(!product){
            return res.status(404).json({message:"product not found"})
        }
        return res.status(200).json({message:'Product deleted successfully!'})

    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}