const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const keys = require("../config/keys");

const User = mongoose.model('users');

//put to cookie
passport.serializeUser((user,done) => {
  //user.id adalah atribut __id di mongodb
  done(null, user.id);
});

//turn the user id into user
passport.deserializeUser((id,done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken,refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
          if(existingUser) {
            // we already have a record with the given profile ID
            console.log('user already exist.');
            done(null, existingUser);
          } else {
            // we dont have a user record with this ID, make a new record
            new User({
              googleId: profile.id,
              googleName: profile.displayName,
              googleEmail1: profile.emails[0].value
            }).save()
              .then(user => {
                console.log('success save the user.');
                done(null,user)
              });
          }
        });
      // console.log('access token',accessToken);
      // console.log('refresh token', refreshToken);
      // console.log('profile',profile);
    }
  )
);
