/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const productsModel = require('../models/products');

async function fetchProducts(req, res) {
    try {
        const result = await productsModel.fetchProducts();

        if (result.length > 0) {
            res.status(200).json({ products: result });
        } else {
            res.status(404).json({ message: 'No products to display' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { fetchProducts };
