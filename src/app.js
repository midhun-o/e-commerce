/* eslint-disable linebreak-style */

const express = require('express');
require('dotenv').config();

const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const customerRoutes = require('./routes/customer');
const adminRoutes = require('./routes/admin');

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/customer', customerRoutes);
app.use('/admin', adminRoutes);
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT);
