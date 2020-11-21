const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

require('./services/passport');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => console.log(err));

// routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
