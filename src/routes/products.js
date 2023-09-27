const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');
const productsMiddleware = require('../middleware/auth');

router.post('/getproducts', productsMiddleware.verifyToken, productsController.fetchProducts);

module.exports = router;
