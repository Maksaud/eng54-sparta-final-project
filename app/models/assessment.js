var mongoose    = require('mongoose');
var assessmentSchema   = new mongoose.Schema({
  name: String,
  description: String,
  image: String
});

var assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = assessment;
