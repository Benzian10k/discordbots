//---++++++main const++++++---
const Discord = require('discord.js');
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem();
//---++++++module export++++++---

module.exports = {
	name: 'reaction',
	admin: false,
	aliases: ['react'],
	botowner: false,
	category: 'Emoji',
	description: 'react emojis in user message.',
	guildowner: false,
	hidden: false,
	mod: false,
	usage: 'reaction',
	userRolePermission: false,
	userChannelPermission: false,
	run: async (
		client,
		message,
		args,
		botsend,
		prefix,
		botowner,
		errorchannel,
		economycolour,
		errorcolour,
		infocolour,
		successcolour,
		successemoji,
		warncolour,
		adminemoji,
		arrowemoji,
		backwardemoji,
		economyemoji,
		emojilistemoji,
		erroremoji,
		exitemoji,
		forwardemoji,
		globalemoji,
		miscemoji,
		modemoji,
		settingsemoji,
		wrongemoji,
		botembed,
		useravatar,
		usernickname,
		membernickname,
		colour,
		infoemoji
	) => {
		let messageid = args[0];
		let reactid = args[1];
		let reactwith =
			client.emojis.cache.find(emoji => emoji.name === `${reactid}`) ||
			client.emojis.cache.find(emoji => emoji.id === `${reactid}`);
		if (!reactwith) {
			return botsend.send(`emoji not found`);
		}
		if (reactwith) {
			message.channel.messages.fetch(ms => ms.id === "728354001552146452").then(msg => {
				msg.react(reactwith);
			});
		} else {
			return botsend.send(`no way`);
		}
	}
};
//---++++++file end++++++---
