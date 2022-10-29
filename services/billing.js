const axios = require('../modules/tossAxios');

const Billing = require('../schema/billing');
const Product = require('../schema/product');

exports.create = async ({ id }, { products }) => {
  const billing = await new Billing({
    userId: id,
    products,
  }).save();

  return billing._id;
};

exports.createVirtualAccount = async ({ id, name }, { billingId }) => {
  let amount = 0;
  let orderName = '';
  let prodCnt = 0;

  const billing = await Billing.findById(billingId);

  if (billing?.userId !== id) throw new Error('잘못된 접근입니다.');

  for (const product of billing.products) {
    const prod = await Product.findById(product.id);

    if (orderName === '') orderName = prod.name;
    prodCnt += 1;

    amount += prod.price * product.quantity;
  }

  if (prodCnt > 1) orderName += ` 외 ${prodCnt - 1}건`;

  const { virtualAccount, totalAmount } = (
    await axios.post('/v1/virtual-accounts', {
      amount,
      bank: 'NONGHYEOP',
      customerName: name,
      orderId: billingId,
      orderName,
      validHours: 24,
    })
  ).data;

  const { accountNumber, bank, customerName, dueDate } = virtualAccount;

  return {
    accountNumber,
    bank,
    customerName,
    dueDate,
    totalAmount,
  };
};

exports.confirm = async ({ id }, { orderId, paymentKey, amount }) => {
  await axios.post('/v1/payments/confirm', {
    amount,
    orderId,
    paymentKey,
  });
};

exports.get = async ({ id }, { billingId }) => {
  const billing = await Billing.findById(billingId);

  if (billing?.userId !== id) throw new Error('잘못된 접근입니다.');

  let obj = {};

  const tossResponse = (await axios.get(`/v1/payments/orders/${billingId}`)).data;

  obj.status = tossResponse.status;
  obj.price = tossResponse.totalAmount;

  if (tossResponse.method === '가상계좌' && tossResponse.status === 'WAITING_FOR_DEPOSIT') {
    const { accountNumber, bank, customerName, dueDate } = tossResponse.virtualAccount;

    obj = {
      accountNumber,
      bank,
      customerName,
      dueDate,
      ...obj,
    };
  }

  obj.products = [];
  for (const product of billing.products) {
    const prod = await Product.findById(product.id);

    const { name, price, photoUrls } = prod;
    const { quantity, color, size } = product;

    obj.products.push({
      name,
      photoUrl: photoUrls[0],
      price,
      quantity,
      color,
      size,
    });
  }

  return obj;
};
