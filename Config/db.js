const { connect, connection } = require('mongoose');

const db = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api';

connect(db);

module.exports = connection;