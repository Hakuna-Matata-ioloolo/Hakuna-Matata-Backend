const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const { MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

mongoose.connect(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?authSource=admin`);

module.exports = mongoose.connection;
