/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const customerModel = require('../models/customer');
const token = require('../common/helper');

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email or Password cannot be empty' });
    }
    try {
        const result = await customerModel.login(email, password);
        if (result.length === 1) {
            const jwtToken = token.generateToken(result[0]);
            res.status(200).json({ success: true, message: 'Login successful', token: jwtToken });
        } else {
            res.status(401).json({ success: false, message: 'Incorrect login details' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Database error' });
    }
}

async function signup(req, res) {
    const {
        firstname, lastname, phone, email, password,
    } = req.body;
    if (!firstname.trim() || !lastname.trim() || !phone.trim() || !email.trim() || !password.trim()) {
        res.status(400).json({ success: false, error: 'Please fill all fields' });
    } else {
        try {
            const result = await customerModel.signup(firstname, lastname, phone, email, password);
            if (result.length > 0) {
                if (result[0].email === email) {
                    res.status(401).json({ success: false, message: 'Email already picked' });
                } else {
                    res.status(401).json({ success: false, message: 'Phone number already picked' });
                }
            } else {
                res.status(201).json({ success: true, message: 'User registered successfully' });
            }
        } catch (err) {
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
}

module.exports = { login, signup };
