/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const { makeDb } = require('../../../config/dbConfig');

async function adminLogin(email, password) {
    const connection = await makeDb();
    try {
        const query = 'SELECT id, email FROM user WHERE email = ? AND password = ?';
        const [response] = await connection.query(query, [email, password]);
        return response;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function findUserRole(userId) {
    const connection = await makeDb();
    try {
        const query = 'SELECT r.role_id FROM user u JOIN roles r ON u.id = r.user_id WHERE u.id = ?';
        const [response] = await connection.query(query, [userId]);
        return response;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

module.exports = { adminLogin, findUserRole };
