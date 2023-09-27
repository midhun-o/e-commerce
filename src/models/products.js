const db = require('../../config/dbConfig');

function fetchProducts(callback) {
    const query = 'SELECT p.name,p.price,pi.url FROM products p JOIN product_images pi ON p.id = pi.product_id';
    db.query(query, callback);
}

module.exports = { fetchProducts };
