//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
const Schema = new mongoose.Schema({
	workid: String,
	workmax: Number,
	workmin: Number
});
//---++++++model export++++++---
module.exports = mongoose.model('work', Schema);
//---++++++file end++++++---
