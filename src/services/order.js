const Account = require('../schema/account');
const Order = require('../schema/order');

exports.get = async ({ id }) => {
  const orders = await Order.find({ userId: id });

  return orders.sort((a, b) => !new Date(a.completeDate) - new Date(b.completeDate));
};

exports.getDetail = async ({ id, isAdmin }, { orderId }) => {
  const { userId, price, status, products, payment, completeDate } = await Order.findById(orderId);

  if (!isAdmin && userId !== id) throw new Error('잘못된 접근입니다.');

  const { _id, name, school, grade, clazz, stdId, phoneNumber } = await Account.findById(userId);

  return {
    orderId: _id,
    status,
    completeDate,
    price,
    products,
    payment,
    user: {
      name,
      school,
      grade,
      clazz,
      stdId,
      phoneNumber,
    },
  };
};

exports.getList = async () => {
  let list = await Order.find({});

  list = list.sort((a, b) => !new Date(a.completeDate) - new Date(b.completeDate));

  return await Promise.all(
    list.map(async order => {
      const { _id, userId, completeDate, status } = order;
      const newOrder = {
        orderId: _id,
        completeDate,
        status,
      };

      const { name, school, grade, clazz, stdId } = await Account.findById(userId);
      const newUser = {
        name,
        school,
        grade,
        clazz,
        stdId,
      };

      return {
        ...newOrder,
        user: newUser,
      };
    }),
  );
};
