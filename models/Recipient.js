const mongoose = require('mongoose');

const RecipientSchema = new mongoose.Schema({
  email: String,
  responded: {
    type: Boolean,
    default: false,
  },
});

module.exports = RecipientSchema;
