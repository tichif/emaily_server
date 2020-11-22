const express = require('express');
const passport = require('passport');

const router = express.Router();

// Ask user permission to access their google email
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// get the code sent by google
router.get('/google/callback', passport.authenticate('google'));

// logout user
router.get('/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
