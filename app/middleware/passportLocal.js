const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt');

const { secret } = require('../config/keys');
const UserModel = require('../models/user');

passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      const userDocument = await UserModel.findOne({username: username}).exec();
      const passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash);

      if (passwordsMatch) {
        return done(null, userDocument);
      } else {
        throw('Incorrect Username / Password');
      }
    } catch (error) {
      done(error);
    }
  })
);
