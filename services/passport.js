const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLESECRETCLIENT,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({ googleId: profile.id })
              .save()
              .then((user) => done(null, user))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
