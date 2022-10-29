const mongoose = require('mongoose');

module.exports = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      userId: { type: String, required: true },
      tossPaymentId: { type: String, required: true, unique: true },
      completeDate: { type: Date, default: () => Date.now() },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      status: { type: String, required: true },
      products: { type: [Object], required: true },
      payment: { type: Object, required: true },
    },
    {
      versionKey: false,
    },
  ),
);
