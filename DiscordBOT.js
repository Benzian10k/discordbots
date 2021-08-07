/*Main*/
const Discord = require('discord.js');
const canvas = require('discord-canvas');
const client = new Discord.Client({
	disableEveryone: true,
	disableMentions: 'all',
	shards: 'auto',
	restTimeOffset: 0
});
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem();
const fs = require('fs');
const { MessageAttachment, MessageEmbed, Message } = require('discord.js');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bottoken = process.env.token;

client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands/');
client.commands = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.mongoose = require('./utils/Mongoose');
client.queue = new Map();
client.setMaxListeners(0);
client.mongoose.init();
require('discord-buttons')(client);
cs.setMongoURL(process.env.mongouri);

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

CurrencySystem.cs.on('debug', (debug, error) => {
	console.log(debug);
	if (error) console.error(`\x1b[91m` + `[ERROR]: ${error}!`);
});

client.login(`${bottoken}`).catch(err => {
	console.log(`\x1b[91m` + `[ERROR]: Invalid Discord BOT Token!`);
});
/**/

/*Environmental Variables*/
/*
mongouri,
token
*/
