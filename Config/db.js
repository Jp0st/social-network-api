const {connect, connection} = require('mongoose');  

const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api';

connect(db);

module.exports = connection;