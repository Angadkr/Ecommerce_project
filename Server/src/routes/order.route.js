const orderControllers = require('../controllers/order.controller')
const express = require('express')
const router = express.Router()

router.post("/orders",orderControllers.createOrder)
router.get("/orders/user/:userId",orderControllers.getOrderByUserId)
router.get("/orders",orderControllers.getAllOrders)
router.put("/orders/:id",orderControllers.updateOrder)
router.delete("/orders/:id",orderControllers.deleteOrder)

module.exports = router