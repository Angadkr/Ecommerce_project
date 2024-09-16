const categoryController = require('../controllers/category.controller')
const express = require('express')
const router = express.Router()

router.post("/categories",categoryController.createCategory)
router.get("/categories",categoryController.getAllCategories)
router.put("/categories/:id",categoryController.updateCategoryById)
router.delete("/categories/:id",categoryController.deleteCategoryById)

module.exports = router