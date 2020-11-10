const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares');
const authController = require('../controllers/auth.controller');
const orderController = require('../controllers/order.controller');

router.use(authMiddleware);
router.get('/', authController.isLoggedIn, orderController.getAllOrders);
router.post('/', authController.isLoggedIn, authController.grantAccess('createAny', 'order'), orderController.createOrder);
router.get('/:id', authController.isLoggedIn, orderController.getOrderById);
router.put('/:id', authController.isLoggedIn, authController.grantAccess('updateAny', 'order'), orderController.updateOrder);
router.delete('/:id', authController.isLoggedIn, authController.grantAccess('deleteAny', 'order'), orderController.deleteOrder);

module.exports = router;
