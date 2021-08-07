//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	welcomeimageid: String,
	welcomeimage: String
});
//---++++++model export++++++---
module.exports = mongoose.model('welcomeimage', Schema);
//---++++++file end++++++---
