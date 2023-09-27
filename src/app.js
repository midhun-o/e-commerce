/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
