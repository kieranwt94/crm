const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/stats', dashboardController.getStats);
router.get('/latest-orders', dashboardController.getLatestOrders);

module.exports = router;