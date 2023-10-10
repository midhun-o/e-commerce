/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const adminModel = require('../models/auth');
const token = require('../../common/token');

async function adminLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email or Password cannot be empty' });
    }
    try {
        const result = await adminModel.adminLogin(email, password);
        if (result.length === 1) {
            const jwtToken = token.generateToken(result[0]);
            res.status(200).json({ message: 'Login successful', token: jwtToken });
        } else {
            res.status(401).json({ message: 'Incorrect login details' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
}

module.exports = { adminLogin };
