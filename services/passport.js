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
    async (accessToken,refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
          
      if(existingUser) {
          // we already have a record with the given profile ID
          console.log('user already exist (updated).');
          return done(null, existingUser);
        } 
        
        // we dont have a user record with this ID, make a new record
        const user = await new User({
          googleId: profile.id,
          googleName: profile.displayName,
          googleEmail1: profile.emails[0].value
        }).save();
        console.log('success save the user.(updated)');
        done(null,user);
        
    }
  )
);
