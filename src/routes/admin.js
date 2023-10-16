/* eslint-disable linebreak-style */
const express = require('express');
const { productImageUpload } = require('../admin/middleware/productImageConfig');
const { productDetailsUpload } = require('../admin/middleware/productExcelConfig');
const { bannerImageUpload } = require('../admin/middleware/bannerImageConfig');

const router = express.Router();
const adminController = require('../admin/controllers/products');
const authController = require('../admin/controllers/auth');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../admin/middleware/checkPermission');

router.post('/login', authController.adminLogin);
router.post('/addproduct', authMiddleware.verifyToken, adminMiddleware.fetchRoles(2), productImageUpload.single('productImage'), adminController.addProduct);
router.put('/updateproducts/:id', authMiddleware.verifyToken, adminMiddleware.fetchRoles(3), adminController.updateProduct);
router.delete('/deleteproduct/:id', authMiddleware.verifyToken, adminMiddleware.fetchRoles(4), adminController.deleteProduct);
router.get('/viewroles/:id', authMiddleware.verifyToken, adminMiddleware.fetchRoles(1), adminController.viewRoles);
router.post('/addrole/:id', authMiddleware.verifyToken, adminMiddleware.fetchRoles(1), adminController.addRoles);
router.post('/removerole/:id', authMiddleware.verifyToken, adminMiddleware.fetchRoles(1), adminController.removeRoles);
router.post('/addBannerImage', authMiddleware.verifyToken, adminMiddleware.fetchRoles(1), bannerImageUpload.single('bannerImage'), adminController.addBannerImage);
router.delete('/deleteBannerImage/:id', authMiddleware.verifyToken, adminMiddleware.fetchRoles(1), adminController.deleteBannerImage);
router.get('/fetchBannerImages', adminController.fetchBannerImage);
router.get('/fetchproduct/', authMiddleware.verifyToken, adminController.fetchProducts);
router.post('/addproductexcel', authMiddleware.verifyToken, adminMiddleware.fetchRoles(2), productDetailsUpload.single('productDetails'), adminController.addProductFromExcel);

module.exports = router;
