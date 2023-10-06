/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const authModel = require('../models/auth');

async function checkEditAccess(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader) {
            res.json({ error: 'No token provided' });
        } else {
            const token = authHeader.split(' ')[1];
            const userDetails = jwt.verify(token, secretKey);
            const userId = userDetails.id.id;
            const userRoleId = await authModel.findUserRole(userId);
            console.log(userRoleId);
            if (userRoleId === 1 || userRoleId === 3) {
                next();
            } else {
                res.json({ error: 'You dont have access to Edit Items' });
            }
        }
    } catch (err) {
        res.status(401).json({ error: 'Token verification failed' });
    }
}

async function checkAddAccess(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader) {
            res.json({ error: 'No token provided' });
        } else {
            const token = authHeader.split(' ')[1];
            const userDetails = jwt.verify(token, secretKey);
            const userId = userDetails.id.id;
            const userRoleId = await authModel.findUserRole(userId);
            console.log(userRoleId);
            if (userRoleId === 1 || userRoleId === 2) {
                next();
            } else {
                res.json({ error: 'You dont have access to Add Items' });
            }
        }
    } catch (err) {
        res.status(401).json({ error: 'Token verification failed' });
    }
}

async function checkDeleteAccess(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader) {
            res.json({ error: 'No token provided' });
        } else {
            const token = authHeader.split(' ')[1];
            const userDetails = jwt.verify(token, secretKey);
            const userId = userDetails.id.id;
            const userRoleId = await authModel.findUserRole(userId);
            console.log(userRoleId);
            if (userRoleId === 1 || userRoleId === 4) {
                next();
            } else {
                res.json({ error: 'You dont have access to delete' });
            }
        }
    } catch (err) {
        res.status(401).json({ error: 'Token verification failed' });
    }
}

module.exports = { checkEditAccess, checkAddAccess, checkDeleteAccess };
