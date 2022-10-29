module.exports = async (req, res, next) => {
  try {
    if (!req.account.isAdmin) throw new Error('권한이 없습니다.');

    next();
  } catch (err) {
    next(err);
  }
};
