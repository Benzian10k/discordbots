/*Server information*/
module.exports = {
	name: 'serverinfo',
	aliases: ['server-info'],
	category: 'Information',
	description: 'Get information about your server!',
	usage: 'serverinfo',
	BotChannelPermission: ['USE_EXTERNAL_EMOJIS', 'SEND_MESSAGES', 'EMBED_LINKS'],
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

		let servericon = message.guild.iconURL;
		let serverembed = botembed
			.setColor(`${colour}`)

			.addField(
				`Server Name:`,
				`<a:Arrow:${arrowemoji}>┊${message.guild.name}`,
				true
			)
			.addField(
				`Server Id:`,
				`<a:Arrow:${arrowemoji}>┊${message.guild.id}`,
				true
			)
			.addField(
				`Server Owner:`,
				`<a:Arrow:${arrowemoji}>┊<@${message.guild.ownerID}>`,
				true
			)
			.addField(
				`Server Owner Id:`,
				`<a:Arrow:${arrowemoji}>┊${message.guild.ownerID}`,
				true
			)
			.addField(
				`Server Voice Channels:`,
				`<a:Arrow:${arrowemoji}>┊${
					message.guild.channels.cache.filter(c => c.type === 'voice').size
				}`,
				true
			)
			.addField(
				`Server Text Channels:`,
				`<a:Arrow:${arrowemoji}>┊${
					message.guild.channels.cache.filter(c => c.type === 'text').size
				}`,
				true
			)
			.addField(
				`Server All Channels:`,
				`<a:Arrow:${arrowemoji}>┊${
					message.guild.channels.cache.filter(c => c.type !== 'category').size
				}`,
				true
			)
			.addField(
				`Server Category:`,
				`<a:Arrow:${arrowemoji}>┊${
					message.guild.channels.cache.filter(c => c.type === 'category').size
				}`,
				true
			)
			.addField(
				`Server Roles:`,
				`<a:Arrow:${arrowemoji}>┊${message.guild.roles.cache.size}`,
				true
			)
			.addField(
				`Server Normal Emojis:`,
				`<a:Arrow:${arrowemoji}>┊${
					message.guild.emojis.cache.filter(e => !e.animated).size
				}`,
				true
			)
			.addField(
				`Server Animated Emojis:`,
				`<a:Arrow:${arrowemoji}>┊${
					message.guild.emojis.cache.filter(e => e.animated).size
				}`,
				true
			)
			.addField(
				`Server All Emojis:`,
				`<a:Arrow:${arrowemoji}>┊${message.guild.emojis.cache.size}`,
				true
			)
			.addField(
				`Server Created Date:`,
				`<a:Arrow:${arrowemoji}>┊${message.guild.createdAt}`
			)
			.addField(
				`Server Total Members:`,
				`<a:Arrow:${arrowemoji}>┊${message.guild.memberCount}`
			)
			.addField(
				`Server Icon:`,
				`<a:Arrow:${arrowemoji}>┊[Click Here](${message.guild.iconURL({
					dynamic: true,
					size: 4096
				})})`
			)
			.setThumbnail(message.guild.iconURL({ dynamic: true }));

		botsend
			.send({
				embed: serverembed,
				buttons: buttonarray
			})
			.then(msg => {
				msg.delete({ timeout: 30000 }).catch(err => undefined);
			})
			.catch(err => {});
	}
};
/**/
