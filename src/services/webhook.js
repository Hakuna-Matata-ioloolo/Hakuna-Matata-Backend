const Billing = require('../schema/billing');
const Product = require('../schema/product');
const Order = require('../schema/order');

const axios = require('../modules/tossAxios');

exports.webhook = async ({ data }) => {
  let { method, orderId, paymentKey, orderName, status, totalAmount } = data;

  const originalOrder = await Order.findOne({ tossPaymentId: paymentKey });

  if (originalOrder) {
    await Order.findOneAndUpdate({ tossPaymentId: paymentKey }, { status });
  } else {
    let { userId, products } = await Billing.findById(orderId);
    products = await Promise.all(
      products.map(async product => {
        const { name, photoUrls, price } = await Product.findById(product.id);

        return {
          name,
          photoUrl: photoUrls[0],
          price,
          ...product,
        };
      }),
    );

    let detailPayment = {};

    if (method === '카드') {
      const { company, number } = data.card;

      detailPayment = {
        company,
        number,
      };
    } else if (method === '간편결제') {
      const { provider } = data.easyPay;

      detailPayment = {
        provider,
      };
    }

    let document = {
      userId,
      tossPaymentId: paymentKey,
      name: orderName,
      price: totalAmount,
      status,
      products,
      payment: {
        method,
        ...detailPayment,
      },
    };

    if (Object.keys(data).length === 3) {
      const _sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

      await _sleep(500);

      const { orderName, totalAmount, virtualAccount } = (
        await axios.get(`/v1/payments/${paymentKey}`)
      ).data;

      document.name = orderName;
      document.price = totalAmount;
      document.payment = {
        method: '가상계좌',
        ...virtualAccount,
      };
    }

    await new Order(document).save();
  }
};
