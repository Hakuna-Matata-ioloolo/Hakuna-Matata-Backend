const mongoose = require('mongoose');

mongoose.connect('mongodb://sondaehyeon01:RootMJ0616!~@localhost:27017/hakunamatata?authSource=admin');

module.exports = mongoose.connection;
