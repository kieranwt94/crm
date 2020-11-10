const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

router.use(authMiddleware);
router.get('/', authController.isLoggedIn, userController.getAllUsers);
router.post('/', authController.isLoggedIn, authController.grantAccess('createAny', 'user'), userController.createUser);
router.get('/:id', authController.isLoggedIn, authController.grantAccess('readAny', 'user'), userController.getUserById);
router.put('/:id', authController.isLoggedIn, authController.grantAccess('updateAny', 'user'), userController.updateUser);
router.delete('/:id', authController.isLoggedIn, authController.grantAccess('deleteAny', 'user'), userController.deleteUser);

module.exports = router;
