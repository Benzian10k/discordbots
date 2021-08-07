//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
const Schema = new mongoose.Schema({
	inverteryid: String,
	invertery: Object
});
//---++++++model export++++++---
module.exports = mongoose.model('invertery', Schema);
//---++++++file end++++++---
