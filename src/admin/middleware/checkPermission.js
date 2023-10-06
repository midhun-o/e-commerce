/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const authModel = require('../models/auth');

async function checkAdminAccess(req, res, next) {
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
            const roles = [];
            userRoleId.forEach((item) => {
                roles.push(item.role_id);
            });
            if (roles.includes(1)) {
                next();
            } else {
                res.json({ error: 'You are not a admin' });
            }
        }
    } catch (err) {
        res.status(401).json({ error: 'Token verification failed' });
    }
}

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
            const roles = [];
            userRoleId.forEach((item) => {
                roles.push(item.role_id);
            });
            if (roles.includes(1) || roles.includes(3)) {
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
            const roles = [];
            userRoleId.forEach((item) => {
                roles.push(item.role_id);
            });
            if (roles.includes(1) || roles.includes(2)) {
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
            const roles = [];
            userRoleId.forEach((item) => {
                roles.push(item.role_id);
            });
            if (roles.includes(1) || roles.includes(4)) {
                next();
            } else {
                res.json({ error: 'You dont have access to Delete Items' });
            }
        }
    } catch (err) {
        res.status(401).json({ error: 'Token verification failed' });
    }
}

module.exports = {
    checkAdminAccess, checkEditAccess, checkAddAccess, checkDeleteAccess,
};
