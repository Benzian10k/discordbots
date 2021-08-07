//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
const Schema = new mongoose.Schema({
	dailyid: String,
	daily: Number
});
//---++++++model export++++++---
module.exports = mongoose.model('daily', Schema);
//---++++++file end++++++---
