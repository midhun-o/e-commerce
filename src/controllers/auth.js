/* eslint-disable max-len */
/* eslint-disable no-console */
const customerModel = require('../models/customer');
const token = require('../common/token');

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ message: 'Email or Password cannot be empty' });
    }
    try {
        const result = await customerModel.login(email, password);
        if (result.length === 1) {
            const jwtToken = token.generateToken(result[0].email);
            res.json({ message: 'Login successful', token: jwtToken });
        } else {
            res.json({ message: 'Incorrect login details' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
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
                res.status(500).json({ error: 'Internal server error' });
            }
            res.json({ message: 'Signup successful' });
        });
    }
}

module.exports = { login, signup };
