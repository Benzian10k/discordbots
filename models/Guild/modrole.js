//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	modroleid: String,
	modrole: String
});
//---++++++model export++++++---
module.exports = mongoose.model('modrole', Schema);
//---++++++file end++++++---
