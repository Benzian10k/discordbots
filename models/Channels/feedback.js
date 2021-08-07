//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	feedbackid: String,
	feedback: String
});
//---++++++model export++++++---
module.exports = mongoose.model('feedback', Schema);
//---++++++file end++++++---
