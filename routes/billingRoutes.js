const stripe = require('stripe')(
  process.env.NODE_ENV === 'production'
    ? process.env.SECRET_STRIPE_KEY_PROD
    : process.env.SECRET_STRIPE_KEY
);

const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  // charge customer money
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500, // 5$
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id,
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.status(200).send(user);
  });
};
