const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares')
const authController = require('../controllers/auth.controller')
const dashboardController = require('../controllers/dashboard.controller')

router.use(authMiddleware)
router.get('/stats', authController.isLoggedIn, dashboardController.getStats)
router.get('/latest-orders', authController.isLoggedIn, dashboardController.getLatestOrders)

module.exports = router
