//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	prefixid: String,
	prefix: String
});
//---++++++model export++++++---
module.exports = mongoose.model('prefix', Schema);
//---++++++file end++++++---
