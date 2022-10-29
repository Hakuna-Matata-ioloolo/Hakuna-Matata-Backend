const express = require('express');
const router = express.Router();

const WebhookController = require('../controllers/webhook');

router.post('/', WebhookController.webhook);

module.exports = router;
