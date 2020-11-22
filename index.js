const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv').config();

// Models
require('./models/User');

require('./services/passport');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Using cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [
      process.env.NODE_ENV === 'production'
        ? process.env.COOKIE_KEY_PROD
        : process.env.COOKIE_KEY,
    ], // encrypt cookie
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect to DB
mongoose
  .connect(
    process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    }
  )
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => console.log(err));

// routes
app.use('/', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
