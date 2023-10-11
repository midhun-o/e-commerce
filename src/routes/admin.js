/* eslint-disable linebreak-style */
const express = require('express');
const { productImageUpload } = require('../admin/middleware/productImageConfig');
const { bannerImageUpload } = require('../admin/middleware/bannerImageConfig');

const router = express.Router();
const adminController = require('../admin/controllers/products');
const authController = require('../admin/controllers/auth');
const authMiddleware = require('../middleware/auth');

router.post('/login', authController.adminLogin);
router.post('/addproduct', authMiddleware.verifyToken, productImageUpload.single('productImage'), adminController.addProduct);
router.put('/updateproducts/:id', authMiddleware.verifyToken, adminController.updateProduct);
router.delete('/deleteproduct/:id', authMiddleware.verifyToken, adminController.deleteProduct);
router.get('/viewroles/:id', authMiddleware.verifyToken, adminController.viewRoles);
router.post('/addrole/:id', authMiddleware.verifyToken, adminController.addRoles);
router.post('/removerole/:id', authMiddleware.verifyToken, adminController.removeRoles);
router.post('/addBannerImage', authMiddleware.verifyToken, bannerImageUpload.single('bannerImage'), adminController.addBannerImage);
router.delete('/deleteBannerImage/:id', authMiddleware.verifyToken, adminController.deleteBannerImage);
router.get('/fetchBannerImages', adminController.fetchBannerImage);
router.get('/fetchproduct/', authMiddleware.verifyToken, adminController.fetchProducts);

module.exports = router;
