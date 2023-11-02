/* eslint-disable linebreak-style */

const { makeDb } = require('../../config/dbConfig');

async function fetchProducts(page) {
    const connection = await makeDb();
    try {
        const fetchSkip = page * 8;
        const query = 'SELECT p.name, p.price, pi.url, p.description FROM products p JOIN product_images pi ON p.id = pi.product_id limit ?,?';
        const [results] = await connection.query(query, [fetchSkip, 8]);
        return results;
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function fetchProductById(productId) {
    const connection = await makeDb();
    try {
        const query = 'SELECT * FROM products p JOIN product_images pi ON p.id = pi.product_id WHERE p.id = ?';
        const [results] = await connection.query(query, [productId]);
        if (results.length > 0) {
            return results[0];
        } else {
            return false;
        }
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function fetchCategoryAndProducts() {
    const connection = await makeDb();
    try {
        const query = 'select c.name as category,p.name as product,p.description as description,pi.url as imageLink from products as p join category as c on p.category_id = c.id left join product_images as pi on p.id = pi.product_id';
        const [results] = await connection.query(query);
        if (results.length > 0) {
            return results;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

module.exports = { fetchProducts, fetchProductById, fetchCategoryAndProducts };
