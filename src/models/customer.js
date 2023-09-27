/* eslint-disable no-console */
const db = require('../../config/dbConfig');

async function login(email, password) {
    try {
        const query = 'SELECT * FROM customer WHERE email = ? AND password = ?';
        const values = [email, password];
        const response = await db.query(query, values);
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function signup(firstname, lastname, phone, email, password) {
    try {
        const query = 'INSERT INTO customer (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)';
        const response = await db.query(query, [firstname, lastname, phone, email, password]);
        return response;
    } catch (err) {
        console.error(err);
        return false;
    }
}

module.exports = { login, signup };
