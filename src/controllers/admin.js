/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */
const adminModel = require('../models/admin');

async function addProduct(req, res) {
    try {
        const {
            name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId,
        } = req.body;
        const result = await adminModel.addProduct(name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId);
        if (result) {
            res.status(200).json({ message: 'Item added successfully' });
        } else {
            res.status(404).json({ message: 'Something went wrong' });
        }
    } catch (err) {
        console.error('DB retrieve error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { addProduct };
