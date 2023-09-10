const mongoose = require('mongoose');

module.exports = mongoose.model(
  'product',
  new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      photoUrls: { type: [String], required: true },
      price: { type: Number, required: true },
      colors: { type: [String], default: [] },
      sizes: { type: [String], default: [] },
    },
    {
      versionKey: false,
    },
  ),
);
