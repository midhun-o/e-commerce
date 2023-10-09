/* eslint-disable linebreak-style */
const express = require('express');
const { productImageUpload } = require('../admin/middleware/productImageConfig');
const { bannerImageUpload } = require('../admin/middleware/bannerImageConfig');

const router = express.Router();
const adminController = require('../admin/controllers/products');
const authController = require('../admin/controllers/auth');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../admin/middleware/checkPermission');

router.post('/login', authController.adminLogin);
router.post('/addproduct', authMiddleware.verifyToken, adminMiddleware.checkAddAccess, productImageUpload.single('productImage'), adminController.addProduct);
router.put('/updateproducts/:id', authMiddleware.verifyToken, adminMiddleware.checkEditAccess, adminController.updateProduct);
router.delete('/deleteproduct/:id', authMiddleware.verifyToken, adminMiddleware.checkDeleteAccess, adminController.deleteProduct);
router.get('/viewroles/:id', authMiddleware.verifyToken, adminMiddleware.checkAdminAccess, adminController.viewRoles);
router.post('/addrole/:id', authMiddleware.verifyToken, adminMiddleware.checkAdminAccess, adminController.addRoles);
router.post('/removerole/:id', authMiddleware.verifyToken, adminMiddleware.checkAdminAccess, adminController.removeRoles);
router.post('/addBannerImage', authMiddleware.verifyToken, adminMiddleware.checkAddAccess, bannerImageUpload.single('bannerImage'), adminController.addBannerImage);
router.delete('/deleteBannerImage/:id', authMiddleware.verifyToken, adminMiddleware.checkDeleteAccess, adminController.deleteBannerImage);
router.get('/fetchBannerImages', authMiddleware.verifyToken, adminMiddleware.checkAdminAccess, adminController.fetchBannerImage);

module.exports = router;
