const stripe = require('stripe')(
  process.env.NODE_ENV === 'production'
    ? process.env.SECRET_STRIPE_KEY_PROD
    : process.env.SECRET_STRIPE_KEY
);

module.exports = (app) => {
  // charge customer money
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500, // 5$
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id,
    });
    console.log(charge);
  });
};
