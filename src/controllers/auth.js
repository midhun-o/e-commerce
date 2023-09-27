/* eslint-disable max-len */
/* eslint-disable no-console */
const customerModel = require('../models/customer');
const token = require('../common/token');

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).res.json({ message: 'Email or Password cannot be empty' });
    }
    try {
        const result = await customerModel.login(email, password);
        if (result.length === 1) {
            const jwtToken = token.generateToken(result[0].email);
            res.status(200).json({ message: 'Login successful', token: jwtToken });
        } else {
            res.status(401).json({ message: 'Incorrect login details' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}

async function signup(req, res) {
    const {
        firstname, lastname, phone, email, password,
    } = req.body;
    if (!firstname.trim() || !lastname.trim() || !phone.trim() || !email.trim() || !password.trim()) {
        res.status(400).json({ error: 'Please fill all fields' });
    } else {
        try {
            await customerModel.signup(firstname, lastname, phone, email, password);
            res.status(201).json({ message: 'Signup successful' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = { login, signup };
