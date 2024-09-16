const Review = require('../models/review.model')

const createReview = async(req,res)=>{
    try{
        const {productId,userId,rating,comment} = req.body

        const review = new Review({productId,userId,rating,comment})
        const savedReview = await review.save()

        const newReview = await Review.findById(savedReview._id).populate('userId')
        return res.status(201).json(newReview)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getReviews = async(req,res)=>{
    try{
        const productId = req.params.productId;
        const reviews = await Review.find({productId}).populate('userId')
        return res.status(201).json(reviews)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const updateReviews = async(req,res)=>{
    try{
        const {rating,comment} = req.body
        const reviewId = req.params.id;
        const updateReview = await Review.findByIdAndUpdate(reviewId,{rating,comment},{new:true})

        if(!updateReview){
            return res.send(404).json({message:"Review not found"})
        }

        return res.send(201).json(updateReview)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const deleteReview = async(req,res)=>{
    try{
        const reviewId = req.params.id
        const review = await Review.findByIdAndDelete(reviewId)
        if(!review){
            return res.send(404).json({message:"Review not found"})
        }
        return res.send(201).json({message:"Review Deleted successfully"})
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

module.exports = {
    createReview,
    getReviews,
    updateReviews,
    deleteReview
}