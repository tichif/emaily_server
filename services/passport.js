const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => console.log(err));
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.NODE_ENV === 'production'
          ? process.env.GOOGLECLIENTID_PROD
          : process.env.GOOGLECLIENTID,
      clientSecret:
        process.env.NODE_ENV === 'production'
          ? process.env.GOOGLESECRETCLIENT_PROD
          : process.env.GOOGLESECRETCLIENT,
      callbackURL: '/auth/google/callback',
      proxy: true,
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
