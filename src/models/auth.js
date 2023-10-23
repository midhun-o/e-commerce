/* eslint-disable linebreak-style */

const { makeDb } = require('../../config/dbConfig');

async function login(email, password) {
    const connection = await makeDb();
    try {
        const query = 'SELECT id, email FROM customer WHERE email = ? AND password = ?';
        const [response] = await connection.query(query, [email, password]);
        return response;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

async function signup(firstname, lastname, phone, email, password) {
    const connection = await makeDb();
    try {
        const check = 'SELECT email,phone FROM customer WHERE email = ? or phone = ?';
        const [result] = await connection.query(check, [email, phone]);
        if (result.length > 0) {
            return result;
        }
        const query = 'INSERT INTO customer (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)';
        await connection.query(query, [firstname, lastname, phone, email, password]);
        return result;
    } catch (err) {
        return false;
    } finally {
        connection.end();
    }
}

module.exports = { login, signup };
