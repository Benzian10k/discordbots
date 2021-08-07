//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	leaveid: String,
	leave: String
});
//---++++++model export++++++---
module.exports = mongoose.model('leave', Schema);
//---++++++file end++++++---
