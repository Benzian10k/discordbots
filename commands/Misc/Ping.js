/*Command*/
module.exports = {
	name: 'ping',
	admin: false,
	botowner: false,
	category: 'Misc',
	cooldown: false,
	description: 'Just for information!',
	guildowner: false,
	hidden: false,
	mod: false,
	usage: 'ping',
	BotRolePermission: false,
	BotChannelPermission: ['SEND_MESSAGES', 'EMBED_LINKS'],
	UserRolePermission: false,
	UserChannelPermission: false,
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
		infoemoji,
		CommandName,
		command
	) => {
		const { Infinityemoji, Partneremoji } = require('../../config/Emoji.json');
		const Discord = require('discord.js');
		const CurrencySystem = require('currency-system');
		const cs = new CurrencySystem();
		const { Botscope, Botsupportserver } = require('../../config/Bot.json');
		const { MessageButton } = require('discord-buttons');
		const invite = `https://discord.com/oauth2/authorize?client_id=${
			client.user.id
		}&permissions=${Botscope}&scope=bot`;
		let firstbutton = new MessageButton()
			.setStyle('url')
			.setEmoji(`${Infinityemoji}`)
			.setLabel('INVITE ME')
			.setURL(`${invite}`);
		let secondbutton = new MessageButton()
			.setStyle('url')
			.setEmoji(`${Partneremoji}`)
			.setLabel(`SERVER`)
			.setURL(`${Botsupportserver}`);

		var buttonarray = [firstbutton, secondbutton];
		botsend.send(
			botembed
				.setColor(colour)
				.setDescription(

				`🏓╎Latency is ${Date.now() -
						message.createdTimestamp}ms. API Latency is ${Math.round(
						client.ws.ping
					)}ms`
				)
		);
	}
};
/**/
