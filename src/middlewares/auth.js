const jsonwebtoken = require('jsonwebtoken');

const Account = require('../schema/account');

module.exports = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) throw new Error('인증 세션이 존재하지 않습니다.');
    if (!bearer.startsWith('Bearer ')) throw new Error('유효하지 않는 인증 세션입니다.');

    const { token } = await jsonwebtoken.verify(bearer.split(' ')[1], process.env.JWT_SECRET_KEY);

    if (!token) throw new Error('유효하지 않는 인증 세션입니다.');

    const account = await Account.findById(token);

    if (!account) throw new Error('유효하지 않는 인증 세션입니다.');

    const document = account._doc;

    document.id = document._id.toString();

    delete document._id;
    delete document.password;
    delete document.salt;

    req.account = document;

    next();
  } catch (err) {
    next(err);
  }
};
