const monk = require('monk');

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

const db = monk(`${username}:${password}@localhost:27017/${db_name}`,{authSource:'admin'});

module.exports = db;
