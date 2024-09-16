const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review.controller')

router.post('/reviews',reviewController.createReview)
router.get('/reviews',reviewController.getReviews)
router.put('/reviews/:id',reviewController.updateReviews)
router.delete('/reviews/:id',reviewController.deleteReview)

module.exports = router