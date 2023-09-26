/* eslint-disable max-len */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const customerModel = require('../models/customer');

function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('Email or Password cannot be empty');
        res.json({ message: 'Email or Password cannot be empty' });
    } else {
        customerModel.login(email, password, (err, result) => {
            if (err) {
                console.log('DB retrieve error', err);
                res.status(500).json({ error: 'Internal server error' });
            }
            console.log(result);
            console.log(result.length);
            if (result.length === 1) {
                const secretKey = '8tkdW4TkUwz0rVygja5a0Akk2j+qEC4jBWw9SYlAHrgyFUdNz3U5skn6Jdeq41yH';
                const customer = {
                    email: result[0].email,
                };
                const token = jwt.sign(customer, secretKey, { expiresIn: '1h' });
                res.json({
                    message: 'Login successful',
                    token: token,
                });
            } else {
                res.json({ message: 'Incorrect login details' });
            }
        });
    }
}

function signup(req, res) {
    const {
        firstname, lastname, phone, email, password,
    } = req.body;
    if (!firstname.trim() || !lastname.trim() || !phone.trim() || !email.trim() || !password.trim()) {
        res.json({ error: 'Please fill all fields' });
    } else {
        customerModel.signup(firstname, lastname, phone, email, password, (err) => {
            if (err) {
                console.log('DB insert error', err);
                res.status(500).json({ error: 'Internal server error' });
            }
            res.json({ message: 'Signup successful' });
        });
    }
}

module.exports = { login, signup };
