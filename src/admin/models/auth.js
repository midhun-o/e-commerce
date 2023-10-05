/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */

const { makeDb } = require('../../../config/dbConfig');

async function adminLogin(email, password) {
    const connection = await makeDb();
    try {
        const query = 'SELECT id FROM user WHERE email = ? AND password = ?';
        const [response] = await connection.query(query, [email, password]);
        return response;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        connection.end();
    }
}

async function findUserRole(userId) {
    const connection = await makeDb();
    try {
        const query = 'SELECT ur.id FROM user u JOIN user_roles ur ON u.role_id = ur.id WHERE u.id = ?';
        const [response] = await connection.query(query, [userId]);
        return response[0].id;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

module.exports = { adminLogin, findUserRole };
