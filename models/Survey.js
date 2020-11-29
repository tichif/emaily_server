const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [String],
  yes: {
    type: Number,
    default: 0,
  },
  no: {
    type: Number,
    default: 0,
  },
});

mongoose.model('Survey', SurveySchema);
