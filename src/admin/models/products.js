/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const { makeDb } = require('../../../config/dbConfig');

async function viewRoles(id) {
    const connection = await makeDb();
    try {
        const viewRolesQuery = 'select u.id as userId,u.username as userName, r.role_id as roleId,ur.name roleName from user u join roles r on u.id = r.user_id join user_roles ur on r.role_id = ur.id where u.id = ?';
        const result = await connection.query(viewRolesQuery, [id]);
        return result[0];
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function addRoles(id, roleId) {
    const connection = await makeDb();
    try {
        const addRolesQuery = 'INSERT INTO roles (user_id,role_id) VALUES (?, ?)';
        await connection.query(addRolesQuery, [id, roleId]);
        return true;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function removeRoles(id, roleId) {
    const connection = await makeDb();
    try {
        const removeRolesQuery = 'DELETE FROM roles WHERE user_id = ? and role_id = ?';
        await connection.query(removeRolesQuery, [id, roleId]);
        return true;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

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
        return false;
    } finally {
        connection.end();
    }
}

async function updateProduct(updatedDetails, productId) {
    const connection = await makeDb();
    try {
        const selectProductQuery = 'SELECT * FROM products WHERE id = ?';
        const [existingProduct] = await connection.query(selectProductQuery, [productId]);
        if (existingProduct.length === 0) {
            return false;
        }
        const updateProductsQuery = 'UPDATE products SET ? WHERE id = ?';
        await connection.query(updateProductsQuery, [updatedDetails, productId]);
        return true;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function deleteProduct(productId) {
    const connection = await makeDb();
    try {
        const selectProductQuery = 'SELECT * FROM products WHERE id = ?';
        const [existingProduct] = await connection.query(selectProductQuery, [productId]);
        if (existingProduct.length === 0) {
            return false;
        }
        const deleteImageQuery = 'DELETE FROM product_images WHERE product_id = ?';
        await connection.query(deleteImageQuery, [productId]);
        const deleteProductQuery = 'DELETE FROM products WHERE id = ?';
        await connection.query(deleteProductQuery, [productId]);
        return true;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

module.exports = {
    addProduct, updateProduct, deleteProduct, viewRoles, addRoles, removeRoles,
};
