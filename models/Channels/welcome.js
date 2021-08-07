//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	welcomeid: String,
	welcome: String
});
//---++++++model export++++++---
module.exports = mongoose.model('welcome', Schema);
//---++++++file end++++++---
