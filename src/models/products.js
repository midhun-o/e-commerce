/* eslint-disable linebreak-style */

const db = require('../../config/dbConfig');

async function fetchProducts() {
    const query = 'SELECT p.name, p.price, pi.url FROM products p JOIN product_images pi ON p.id = pi.product_id';

    try {
        const results = await db.query(query);
        return results;
    } catch (error) {
        return false;
    }
}

module.exports = { fetchProducts };
