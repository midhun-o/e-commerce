/* eslint-disable no-console */
/* eslint-disable linebreak-style */

const db = require('../../config/dbConfig');

async function login(email, password) {
    try {
        const query = 'SELECT id FROM customer WHERE email = ? AND password = ?';
        const [response] = await db.query(query, [email, password]);
        return response;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function signup(firstname, lastname, phone, email, password) {
    try {
        const checkEmail = 'SELECT id FROM customer WHERE email = ?';
        const [emailFound] = await db.query(checkEmail, [email]);
        const checkPhone = 'SELECT id FROM customer WHERE phone = ?';
        const [phoneFound] = await db.query(checkPhone, [phone]);
        if (emailFound.length > 0) {
            return 'Email already in use';
        }
        if (phoneFound.length > 0) {
            return 'Phone already in use';
        }
        const query = 'INSERT INTO customer (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)';
        await db.query(query, [firstname, lastname, phone, email, password]);
        return 'Signup Successfull';
    } catch (err) {
        return false;
    }
}

module.exports = { login, signup };
