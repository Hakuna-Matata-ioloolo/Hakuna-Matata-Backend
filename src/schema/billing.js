const mongoose = require('mongoose');

module.exports = mongoose.model(
  'billing',
  new mongoose.Schema(
    {
      userId: { type: String, required: true },
      products: { type: [Object], required: true },
    },
    {
      versionKey: false,
    },
  ),
);
