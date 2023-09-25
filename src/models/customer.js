const db = require('../../config/dbConfig');

function login(email, password, callback) {
    const query = 'SELECT * FROM customer WHERE email = ? AND password = ?';
    db.query(query, [email, password], callback);
}

function signup(firstname, lastname, phone, email, password, callback) {
    const query = 'INSERT INTO customer (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [firstname, lastname, phone, email, password], callback);
}

module.exports = { login, signup };
