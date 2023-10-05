/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const adminController = require('../admin/controllers/products');
const authController = require('../admin/controllers/auth');
const adminMiddleware = require('../middleware/auth');

router.post('/login', authController.adminLogin);
router.post('/addproduct', adminMiddleware.verifyToken, adminController.addProduct);

module.exports = router;
