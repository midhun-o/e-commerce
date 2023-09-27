const db = require('../../config/dbConfig');

function fetchProducts(callback) {
    const query = 'select p.name,p.price,pi.url from products p join product_images pi on p.id = pi.product_id';
    db.query(query, callback);
}

module.exports = { fetchProducts };
