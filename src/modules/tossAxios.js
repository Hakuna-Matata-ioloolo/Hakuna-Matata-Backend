const axios = require('axios');
const axiosInstance = axios.create({
  baseURL: 'https://api.tosspayments.com',
  timeout: 5000,
});

require('dotenv').config();

const TOSS_SECRET_KEY =
  'Basic ' + Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64');

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.common['Authorization'] = TOSS_SECRET_KEY;

module.exports = axiosInstance;
