/* eslint-disable linebreak-style */
/* eslint-disable no-console */

const { makeDb } = require('../../config/dbConfig');

async function login(email, password) {
    const connection = await makeDb();
    try {
        const query = 'SELECT id FROM customer WHERE email = ? AND password = ?';
        const [response] = await connection.query(query, [email, password]);
        return response;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        connection.end();
    }
}

async function signup(firstname, lastname, phone, email, password) {
    const connection = await makeDb();
    try {
        const checkEmail = 'SELECT id FROM customer WHERE email = ?';
        const [emailFound] = await connection.query(checkEmail, [email]);
        const checkPhone = 'SELECT id FROM customer WHERE phone = ?';
        const [phoneFound] = await connection.query(checkPhone, [phone]);
        if (emailFound.length > 0) {
            return 'Email already in use';
        }
        if (phoneFound.length > 0) {
            return 'Phone already in use';
        }
        const query = 'INSERT INTO customer (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)';
        await connection.query(query, [firstname, lastname, phone, email, password]);
        return 'Signup Successfull';
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

module.exports = { login, signup };
