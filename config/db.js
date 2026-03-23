const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

// In models/contacts-data.js

let _db; // Use an underscore to differentiate from the function name

const initDb = (callback) => {
  if (_db) {
    console.warn('Db is already initialized!');

    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // FORCE it to the specific database name from your .env
      _db = client.db(process.env.MONGODB_DB_NAME);
      console.log('Connecting to Database:', process.env.MONGODB_DB_NAME);
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};