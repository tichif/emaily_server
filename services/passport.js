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
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
