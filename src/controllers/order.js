const OrderService = require('../services/order');

exports.get = async (req, res, next) => {
  try {
    const orders = await OrderService.get(req.account);

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getDetail = async (req, res, next) => {
  try {
    req.validate(req.body, ['orderId']);

    const detail = await OrderService.getDetail(req.account, req.body);

    res.status(200).json(detail);
  } catch (err) {
    next(err);
  }
};

exports.getList = async (req, res, next) => {
  try {
    const orders = await OrderService.getList();

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
