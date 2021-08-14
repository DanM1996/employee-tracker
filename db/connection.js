const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'aP1+%BarWMA$VUTWInS-lbX%c$',
        database: 'employee_tracker'
    },
    console.log('Connected to employee tracker database!')
);

module.exports = db;