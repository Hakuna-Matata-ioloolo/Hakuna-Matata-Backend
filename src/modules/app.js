const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();

app.request.validate = (body, validator) => {
  validator.forEach(elem => {
    if (!Object.keys(body).includes(elem))
      throw new Error(`파라미터 ${elem}가 전송되지 않았습니다`);
  });
};

console.log('LLL: ' + __dirname)

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/../../static'));
app.use(express.static(__dirname + '/../../upload'));

app.use('/api/account', require('../routes/account'));
app.use('/api/product', require('../routes/product'));
app.use('/api/billing', require('../routes/billing'));
app.use('/api/order', require('../routes/order'));
app.use('/api/webhook', require('../routes/webhook'));

app.all('/api/*', (req, res, next) => {
  next(new Error('잘못된 요청입니다.'));
});

if (fs.existsSync(path.join(__dirname, '../../static/index.html'))) {
  app.all('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../static/index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({ isError: true, message: err.message });
});

module.exports = app;
