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

module.exports = { adminLogin };
