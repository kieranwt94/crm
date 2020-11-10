const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares');
const authController = require('../controllers/auth.controller');
const serviceController = require('../controllers/service.controller');

router.use(authMiddleware);
router.get('/', authController.isLoggedIn, serviceController.getAllServices);
router.post('/', authController.isLoggedIn, authController.grantAccess('createAny', 'service'), serviceController.createService);
router.get('/:id', authController.isLoggedIn, serviceController.getServiceById);
router.put('/:id', authController.isLoggedIn, authController.grantAccess('updateAny', 'service'), serviceController.updateService);
router.delete('/:id', authController.isLoggedIn, authController.grantAccess('deleteAny', 'service'), serviceController.deleteService);

module.exports = router;
