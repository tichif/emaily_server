const express = require('express');
const passport = require('passport');

const router = express.Router();

// Ask user permission to access their google email
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// get the code sent by google
router.get('/auth/google/callback', passport.authenticate('google'));

// logout user
router.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
