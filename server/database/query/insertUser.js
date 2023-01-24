const connection = require('../config/connection');

const insertUser = (first_name, last_name, email, password, phone_number, birthday, gender, address, role, company_name) => connection.query(
  'INSERT INTO users (first_name, last_name, email, password, phone_number, birthday, gender, address, role, company_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
  [first_name, last_name, email, password, phone_number, birthday, gender, address, role, company_name],
);

module.exports = insertUser;
