const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const keys = require("./keys");

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("accessToken", accessToken);
        console.log("profile", profile);
        const image = profile.photos[0].value;
        const newUser = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image
        };
        User.findOne({
          googleID: profile.id
        }).then(user => {
          if (user) {
            done(null, user);
          } else {
            console.log("in new user");
            new User(newUser).save().then(user => done(null, user));
          }
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
};
