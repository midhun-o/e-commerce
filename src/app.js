/* eslint-disable no-console */
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');

app.use('/', authRoutes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
