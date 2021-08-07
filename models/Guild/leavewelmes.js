//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	leavewelmesid: String,
	leavewelmes: String
});
//---++++++model export++++++---
module.exports = mongoose.model('leavewelmes', Schema);
//---++++++file end++++++---
