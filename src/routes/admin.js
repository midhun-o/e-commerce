/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const adminController = require('../admin/controllers/products');
const authController = require('../admin/controllers/auth');
const adminMiddleware = require('../middleware/auth');

router.post('/login', authController.adminLogin);
router.post('/addproduct', adminMiddleware.verifyToken, adminController.addProduct);
router.put('/updateproducts/:id', adminMiddleware.verifyToken, adminController.updateProduct);
router.delete('/deleteproduct/:id', adminMiddleware.verifyToken, adminController.deleteProduct);

module.exports = router;
