//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	welcomecolourid: String,
	welcomecolour: String
});
//---++++++model export++++++---
module.exports = mongoose.model('welcomecolour', Schema);
//---++++++file end++++++---
