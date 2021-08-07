//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	adminroleid: String,
	adminrole: String
});
//---++++++model export++++++---
module.exports = mongoose.model('adminrole', Schema);
//---++++++file end++++++---
