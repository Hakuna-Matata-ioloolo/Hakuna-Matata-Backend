const dotenv = require('dotenv');
const http = require('http');

const app = require('./modules/app');
const mongodb = require('./modules/db');

const onWebStart = () => {
  console.log('Web server start!');
};
const onDbStart = () => {
  console.log('DB server start!');
};

dotenv.config();

http.createServer(app).listen(80, null, onWebStart);

mongodb.on('open', onDbStart);
