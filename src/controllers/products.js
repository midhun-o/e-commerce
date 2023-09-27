/* eslint-disable no-console */
const productsModel = require('../models/products');

function fetchProducts(req, res) {
    productsModel.fetchProducts((err, result) => {
        if (err) {
            console.log('DB retrieve error', err);
            res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length > 0) {
            res.status(200).json({ products: result });
        } else {
            res.status(404).json({ message: 'No products to display' });
        }
    });
}

module.exports = { fetchProducts };
