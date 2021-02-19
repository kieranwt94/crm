const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares')
const authController = require('../controllers/auth.controller')
const brandController = require('../controllers/brand.controller')

router.use(authMiddleware)
router.get('/', authController.isLoggedIn, brandController.getAllBrands)
router.post('/', authController.isLoggedIn, authController.grantAccess('createAny', 'brand'), brandController.createBrand)
router.get('/:id', authController.isLoggedIn, brandController.getBrandById)
router.put('/:id', authController.isLoggedIn, authController.grantAccess('updateAny', 'brand'), brandController.updateBrand)
router.delete('/:id', authController.isLoggedIn, authController.grantAccess('deleteAny', 'brand'), brandController.deleteBrand)

module.exports = router
