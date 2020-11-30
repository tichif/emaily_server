const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Models
require('./models/User');
require('./models/Survey');

require('./services/passport');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like main.js or main.css
  app.use(express.static('client/build'));

  // Express serve up index.html file
  // if it doesn't recognize route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
