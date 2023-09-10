const mongoose = require('mongoose');

module.exports = mongoose.model(
  'account',
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true, unique: true },
      school: { type: String, required: true },
      grade: { type: Number, required: true },
      clazz: { type: Number, required: true },
      stdId: { type: Number, required: true },
      isAdmin: { type: Boolean, default: false },
      password: { type: String, required: true },
      salt: { type: String, required: true },
    },
    {
      versionKey: false,
    },
  ),
);
