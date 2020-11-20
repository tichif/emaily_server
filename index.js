const express = require('express');
require('dotenv').config();

require('./services/passport');
const authRoutes = require('./routes/authRoutes');

const app = express();

// routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
