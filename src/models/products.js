/* eslint-disable linebreak-style */

const db = require('../../config/dbConfig');

async function fetchProducts() {
    const query = 'SELECT p.name, p.price, pi.url FROM products p JOIN product_images pi ON p.id = pi.product_id';
    try {
        const [results] = await db.query(query);
        return results;
    } catch (error) {
        return false;
    }
}

async function fetchProductById(productId) {
    const query = 'SELECT * FROM products p JOIN product_images pi ON p.id = pi.product_id WHERE p.id = ?';
    try {
        const [results] = await db.query(query, [productId]);
        if (results.length > 0) {
            return results[0];
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

async function fetchCategoryAndProducts() {
    const query = 'select c.name as category,p.name as product,p.description as description,pi.url as imageLink from products as p join category as c on p.category_id = c.id left join product_images as pi on p.id = pi.product_id';
    try {
        const [results] = await db.query(query);
        if (results.length > 0) {
            return results;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

module.exports = { fetchProducts, fetchProductById, fetchCategoryAndProducts };
