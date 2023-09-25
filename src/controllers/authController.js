/* eslint-disable no-console */
const db = require('../../config/db-config');

function login(req, res) {
    const { username, password } = req.body;
    const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.log('DB retrive error', err);
            res.status(500).json({ error: 'Internal server error' });
        }
        console.log(result);
        console.log(result.length);
        if (result.length === 1) {
            res.json({ message: 'Login successful' });
        } else {
            res.json({ message: 'Incorrect login details' });
        }
    });
}

function signup(req, res) {
    const {
        firstname, lastname, email, username, password,
    } = req.body;
    console.log(req.body);
    const query = 'INSERT INTO user (firstname, lastname, email, username, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [firstname, lastname, email, username, password], (err, result) => {
        if (err) {
            console.log('DB insert error', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ message: 'Signup successful' });
        }
    });
}

module.exports = { login, signup };
