/* eslint-disable no-console */
const db = require('../../config/dbConfig');

async function login(email, password) {
    try {
        const query = 'SELECT * FROM customer WHERE email = ? AND password = ?';
        const response = await db.query(query, [email, password]);
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return false;
    }
}

function signup(firstname, lastname, phone, email, password, callback) {
    const query = 'INSERT INTO customer (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [firstname, lastname, phone, email, password], callback);
}

module.exports = { login, signup };
