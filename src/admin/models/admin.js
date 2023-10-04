/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */

const db = require('../../../config/dbConfig');

async function adminLogin(email, password) {
    try {
        const query = 'SELECT id FROM user WHERE email = ? AND password = ?';
        const [response] = await db.query(query, [email, password]);
        return response;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function addProduct(name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId, imageLink) {
    try {
        const addProductsQuery = 'INSERT INTO products (name, sku, description, price, stock, max_limit_per_order, category_id, discount, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await db.query(addProductsQuery, [name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId]);
        const query = 'SELECT id FROM products WHERE sku = ?';
        const [response] = await db.query(query, [sku]);
        const productId = response[0].id;
        const addImageQuery = 'INSERT INTO product_images (product_id, url) VALUES (?, ?)';
        await db.query(addImageQuery, [productId, imageLink]);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = { adminLogin, addProduct };
