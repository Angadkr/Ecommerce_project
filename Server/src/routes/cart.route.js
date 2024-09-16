const cartControllers = require('../controllers/cart.controller')
const express = require('express')
const router = express.Router()

router.post("/carts",cartControllers.addToCart)
router.get("/carts/user/:userId",cartControllers.getCartByUserId)
router.delete("/carts/:id",cartControllers.deleteCartById)
router.delete("/carts/user/:userId",cartControllers.deleteAllCartsByUserId)

module.exports = router