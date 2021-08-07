//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	logid: String,
	log: String
});
//---++++++model export++++++---
module.exports = mongoose.model('log', Schema);
//---++++++file end++++++---
