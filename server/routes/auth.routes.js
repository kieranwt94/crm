const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { route } = require('./brand.routes');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/authenticate', authController.getAuthUser);

module.exports = router;
