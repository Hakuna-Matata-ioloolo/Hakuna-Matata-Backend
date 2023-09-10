const AccountService = require('../services/account');

exports.getInfo = async (req, res, next) => {
  try {
    res.json(req.account);
  } catch (err) {
    next(err);
  }
};

exports.getList = async (req, res, next) => {
  try {
    const list = await AccountService.getList();

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    req.validate(req.body, ['phoneNumber', 'password']);

    const token = await AccountService.login(req.body);

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    req.validate(req.body, [
      'name',
      'phoneNumber',
      'school',
      'grade',
      'clazz',
      'stdId',
      'password',
    ]);

    const token = await AccountService.register(req.body);

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
