var Users = require('../models/user')

function getAll(req, res) {
  Users.find(function(error, users) {
    if(error) throw error

    let options = {
      alert: null,
      error: null,
      signedIn: true,
      users: users
    }

    res.render('users', options);
  })
}

module.exports = {
  getAll: getAll
}
