const Category = require("../models/category.model")

const createCategory = async (req,res)=>{
    try{
        const {name} = req.body
        const newCategory = new Category({name})

        await newCategory.save()

        res.status(200).json(newCategory)
    }catch(e){
        res.status(400).json({message:e.message})
    }
}

const getAllCategories = async(req,res)=>{
    try{
        const categories = await Category.find()
        res.status(200).json(categories)
    }catch(e){
        res.status(400).json({message:e.message})
    }
}

const updateCategoryById = async(req,res)=>{
    try{
        const {name} = req.body
        const category = await Category.findById(req.params.id)

        if(!category){
            res.status(404).json({message:"Category does not exist!"})
        }

        category.name = name
        await category.save()

        res.status(200).json(category)
    }catch(e){
        res.status(400).json({message:e.message})
    }
}

const deleteCategoryById = async(req,res)=>{
    try{
        const category = await Category.findById(req.params.id)
        if(!category){
            res.status(404).json({message:"Category does not exist!"})
        } 

        await category.deleteOne()
        res.status(200).json({message:"Category deleted!"})

    }catch(e){
        res.status(500).json({message:e.message})
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategoryById,
    deleteCategoryById
}