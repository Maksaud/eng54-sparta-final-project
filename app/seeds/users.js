var User = require('../models/user');
var mongoose = require('mongoose');
require('dotenv').config()

if(process.env.DB_HOST && process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.DB_HOST);

  User.remove({} , function(user, err, next){
    console.log('DATABASE CLEARED');
  });
} else {
  mongoose.connect('mongodb://localhost');

  User.remove({} , function(user, err){
    console.log('DATABASE CLEARED');
  });
}
