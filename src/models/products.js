/* eslint-disable linebreak-style */

const { makeDb } = require('../../config/dbConfig');

async function fetchProducts(page) {
    const connection = await makeDb();
    try {
        const fetchSkip = page * 8;
        const query = 'SELECT p.id,p.name, p.price, pi.url, p.description FROM products p JOIN product_images pi ON p.id = pi.product_id limit ?,?';
        const [results] = await connection.query(query, [fetchSkip, 8]);
        return results;
    } catch (error) {
        return false;
    } finally {
        connection.end();
    }
}

async function getCategories() {
    const connection = await makeDb();
    try {
        const query = 'SELECT id, name FROM category WHERE parent_id != ""';
        const [results] = await connection.query(query);
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
        const query = 'SELECT p.name,p.description,p.price,c.name AS category,pi.url,s.name AS seller FROM products p JOIN product_images pi ON p.id = pi.product_id JOIN category c on p.category_id = c.id JOIN seller s on p.seller_id = s.id WHERE p.id = ?';
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

async function searchProduct(searchString, pageNumber, category, sortValue, sortType) {
    const connection = await makeDb();
    try {
        const fetchSkip = pageNumber * 8;
        if (category === 0) {
            if (sortType === 'low') {
                const query = 'SELECT p.id,p.name, p.price, pi.url, p.description,c.name AS category FROM products p JOIN product_images pi ON p.id = pi.product_id JOIN category c ON p.category_id = c.id WHERE p.name like ? ORDER BY ?? limit ?,?';
                const [results] = await connection.query(query, [`%${searchString}%`, sortValue, fetchSkip, 8]);
                const pageQuery = 'SELECT COUNT(id) AS count FROM products WHERE name like ?';
                const [count] = await connection.query(pageQuery, [`%${searchString}%`]);
                return [results, count[0].count];
            } else {
                const query = 'SELECT p.id,p.name, p.price, pi.url, p.description,c.name AS category FROM products p JOIN product_images pi ON p.id = pi.product_id JOIN category c ON p.category_id = c.id WHERE p.name like ? ORDER BY ?? desc limit ?,?';
                const [results] = await connection.query(query, [`%${searchString}%`, sortValue, fetchSkip, 8]);
                const pageQuery = 'SELECT COUNT(id) AS count FROM products WHERE name like ?';
                const [count] = await connection.query(pageQuery, [`%${searchString}%`]);
                return [results, count[0].count];
            }
        } else if (category !== 0) {
            if (sortType === 'low') {
                const query = 'SELECT p.id,p.name, p.price, pi.url, p.description,c.name AS category FROM products p JOIN product_images pi ON p.id = pi.product_id JOIN category c ON p.category_id = c.id WHERE c.id = ? AND p.name like ? ORDER BY ?? limit ?,?';
                const [results] = await connection.query(query, [category, `%${searchString}%`, sortValue, fetchSkip, 8]);
                const pageQuery = 'SELECT COUNT(id) AS count FROM products WHERE category_id = ? AND name like ?';
                const [count] = await connection.query(pageQuery, [category, `%${searchString}%`]);
                return [results, count[0].count];
            } else {
                const query = 'SELECT p.id,p.name, p.price, pi.url, p.description,c.name AS category FROM products p JOIN product_images pi ON p.id = pi.product_id JOIN category c ON p.category_id = c.id WHERE c.id = ? AND p.name like ? ORDER BY ?? desc limit ?,?';
                const [results] = await connection.query(query, [category, `%${searchString}%`, sortValue, fetchSkip, 8]);
                const pageQuery = 'SELECT COUNT(id) AS count FROM products WHERE category_id = ? AND name like ?';
                const [count] = await connection.query(pageQuery, [category, `%${searchString}%`]);
                return [results, count[0].count];
            }
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

module.exports = {
    getCategories, searchProduct, fetchProducts, fetchProductById, fetchCategoryAndProducts,
};
