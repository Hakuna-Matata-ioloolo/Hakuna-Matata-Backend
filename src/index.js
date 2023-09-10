const dotenv = require('dotenv');
const http = require('http');

dotenv.config();

require('./modules/db').on('open', () => {
  console.log('DB server start!');
});

http.createServer(require('./modules/app')).listen(80, null, () => {
  console.log('Web server start!');
});
