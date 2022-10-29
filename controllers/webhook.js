const WebhookService = require('../services/webhook');

exports.webhook = async (req, res, next) => {
  try {
    req.validate(req.body, ['eventType', 'createdAt', 'data']);

    if (
      req.headers['user-agent'] !== 'tosspayments' ||
      req.body['eventType'] !== 'PAYMENT_STATUS_CHANGED'
    )
      throw new Error('잘못된 요청입니다.');

    await WebhookService.webhook(req.body);

    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
