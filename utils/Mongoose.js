//---++++++main const++++++---
const mongoose = require('mongoose');
//---++++++env const++++++---
const mongouri = process.env.mongouri || `mongodb://localhost:27017/Benzian10k`;
//---++++++module export++++++---
module.exports = {
	init: () => {
		//---++++++mongoDB options++++++---
		const dbOptions = {
			useNewUrlParser: true,

			useUnifiedTopology: true,

			autoIndex: false,

			reconnectTries: Number.MAX_VALUE,

			reconnectInterval: 500,

			poolSize: 5,

			connectTimeoutMS: 10000,

			family: 4
		};
		//---++++++mongoDB connect++++++---
		mongoose
			.connect(
				mongouri,
				dbOptions
			)
			.catch(err => {
				console.log(`\x1b[91m` + `[ERROR]: Invalid mongouri!`);
			});

		mongoose.set('useFindAndModify', false);

		mongoose.Promise = global.Promise;
		//---++++++mongoDB connected successfully++++++---
		mongoose.connection.on('connected', () => {
			console.log(`\x1b[92m` + `[SUCCESSFULL]: mongoDB Connected.`);
		});
		//---++++++mongoDB error++++++---
		mongoose.connection.on('err', err => {
			console.error(`\x1b[91m` + `[ERROR]: in mongoDB!`);
		});
		//---++++++mongoDB disconnected++++++---
		mongoose.connection.on('disconnected', () => {
			console.log(`\x1b[91m` + `[ERROR]: mongoDB connection Lost!`);
		});
	}
};
//---++++++file end++++++---
