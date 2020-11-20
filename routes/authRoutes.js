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

// grt the code sent by google
router.get('/google/callback', passport.authenticate('google'));

module.exports = router;
