const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLESECRETCLIENT,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      new User({ googleId: profile.id }).save();
    }
  )
);
