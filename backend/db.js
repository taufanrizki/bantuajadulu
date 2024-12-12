// backend/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Username default XAMPP MySQL
  password: '',          // Password default XAMPP MySQL (kosong)
  database: 'donations',
  port: 3306,            // Port default MySQL
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});

module.exports = connection;
