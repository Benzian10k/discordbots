//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	joinwelmesid: String,
	joinwelmes: String
});
//---++++++model export++++++---
module.exports = mongoose.model('joinwelmes', Schema);
//---++++++file end++++++---
