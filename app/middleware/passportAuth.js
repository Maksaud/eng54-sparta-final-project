const jwt = require('jsonwebtoken');
const config = require('../config/keys');

const secret = config.secret;

module.exports = function auth(req, res, next) {
  const token = req.cookies['jwt']
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        let options = {
          alert: null,
          error: {
            success: false,
            message: 'Failed to authenticate token!',

          },
          signedIn: false
        }
        res.render('login', options)
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.render('login', {
      error: {
        success: false,
        message: 'No token provided, please login to access this page!'},
        alert: null,
        signedIn: false
    })
  }
};
