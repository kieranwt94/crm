const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares');
const authController = require('../controllers/auth.controller');
const customerController = require('../controllers/customer.controller');

router.use(authMiddleware);
router.get('/', authController.isLoggedIn, customerController.getAllCustomers);
router.post('/', authController.isLoggedIn, authController.grantAccess('createAny', 'customer'), customerController.createCustomer);
router.get('/:id', authController.isLoggedIn, customerController.getCustomerById);
router.put('/:id', authController.isLoggedIn, authController.grantAccess('updateAny', 'customer'), customerController.updateCustomer);
router.delete('/:id', authController.isLoggedIn, authController.grantAccess('deleteAny', 'customer'), customerController.deleteCustomer);

module.exports = router;
