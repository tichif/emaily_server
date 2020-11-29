const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0,
  },
});

mongoose.model('User', UserSchema);
