const BillingService = require('../services/billing');

exports.create = async (req, res, next) => {
  try {
    req.validate(req.body, ['products']);

    const billingId = await BillingService.create(req.account, req.body);

    res.status(200).json({ billingId });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    req.validate(req.body, ['billingId']);

    const result = await BillingService.get(req.account, req.body);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.createVirtualAccount = async (req, res, next) => {
  try {
    req.validate(req.body, ['billingId']);

    const result = await BillingService.createVirtualAccount(req.account, req.body);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.webhookVirtualAccount = async (req, res, next) => {
  try {
    req.validate(req.body, ['orderId', 'status']);

    const result = await BillingService.webhookVirtualAccount(req.body);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.confirmCard = async (req, res, next) => {
  try {
    req.validate(req.body, ['orderId', 'paymentKey', 'amount']);

    await BillingService.confirm(req.account, req.body);

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};
