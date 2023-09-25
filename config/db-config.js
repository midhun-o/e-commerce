/* eslint-disable no-console */
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1110',
    database: 'nodejs',
});

con.connect((err) => {
    if (err) {
        console.error('DB connection failed', err);
    } else {
        console.log('DB Connected');
    }
});

module.exports = con;
