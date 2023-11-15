/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const adminModel = require('../models/auth');
const token = require('../../common/helper');

async function adminLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email or Password cannot be empty' });
    }
    try {
        console.log('hi');
        const result = await adminModel.adminLogin(email, password);
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

module.exports = { adminLogin };
