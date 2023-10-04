/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin');
const adminMiddleware = require('../middleware/auth');

router.post('/addproduct', adminMiddleware.verifyToken, adminController.addProduct);

module.exports = router;
