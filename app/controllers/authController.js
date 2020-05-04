const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const UserModel = require('../models/user');

const passportStrategy = require('../middleware/passportLocal');
const checkToken = require('../middleware/checkToken')


function getRegisterForm(req, res) {
  let options = {
    alert: null,
    error: null,
    signedIn: true
  }
  res.render('register', options);
}

function getLoginForm(req, res, next) {
  if(req.query.loggedout === false){
    checkToken(req, res, next);
  } else {
    let alert = req.query.loggedout ? { signedOut: true, message: 'You have successfully signed out!'} : null;
    let options = {
      alert: alert,
      error: null,
      signedIn: false
    }
    res.render('login', options);
  }
}

async function register(req, res) {
  const { username, password } = req.body;
  const hashCost = 10;

  try {
    const passwordHash = await bcrypt.hash(password, hashCost);
    const userDocument = new UserModel({ username, passwordHash });
    await userDocument.save();

    res.redirect('/users');

  } catch (error) {
    res.status(400).send({
      error: 'req body should take the form { username, password }'
    });
  }
};

function login(req, res, next) {
  passport.authenticate('local',{ session: false },
    (error, user) => {
      if (error || !user) {
        res.render('login', {
          error: {
            success: false,
            message: 'Incorrect password, please try to login again!', },
          alert: null,
          signedIn: false
        });
      } else {
        const payload = {
          username: user.username,
          expires: Math.floor(Date.now() / 1000) + (60 * 60),
        };
        req.login(payload, {session: false}, (error) => {
          if (error) {
            res.render('login', error);
          }
          const token = jwt.sign(JSON.stringify(payload), keys.secret);
          res.cookie('jwt', token, {httpOnly: true, secure: false});
          res.redirect('/');

        });
      }


    },
  )(req, res, next);
};

function logout(req,res) {
  res.clearCookie('jwt');
  res.redirect('/login?loggedout=true');
}

module.exports = {
  register: register,
  getRegisterForm: getRegisterForm,
  getLoginForm,
  login: login,
  logout: logout
}
