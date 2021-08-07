//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++Schema create++++++---
let Schema = new mongoose.Schema({
	emojicode: String,
	emojibackup: String
});
//---++++++model export++++++---
module.exports = mongoose.model('emojibackup', Schema);
//---++++++file end++++++---
