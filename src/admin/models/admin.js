/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */

const { makeDb } = require('../../../config/dbConfig');

async function addProduct(name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId, imageLink) {
    const connection = await makeDb();
    try {
        const addProductsQuery = 'INSERT INTO products (name, sku, description, price, stock, max_limit_per_order, category_id, discount, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await connection.query(addProductsQuery, [name, sku, description, price, stock, maxLimitPerOrder, categoryId, discount, sellerId]);
        const query = 'SELECT id FROM products WHERE sku = ?';
        const [response] = await connection.query(query, [sku]);
        const productId = response[0].id;
        const addImageQuery = 'INSERT INTO product_images (product_id, url) VALUES (?, ?)';
        await connection.query(addImageQuery, [productId, imageLink]);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        connection.end();
    }
}

module.exports = { addProduct };
