//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	errorid: String,
	error: String
});
//---++++++model export++++++---
module.exports = mongoose.model('error', Schema);
//---++++++file end++++++---
