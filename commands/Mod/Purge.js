/*Purge*/
module.exports = {
	name: 'purge',
	aliases: ['clear', 'delete'],
	category: 'Mod',
	description: 'Fast way to delete channel messages!',
	usage: 'purge [Number of messages]',
	mod: true,
	BotChannelPermission: [
		'MANAGE_MESSAGES',
		'READ_MESSAGE_HISTORY',
		'USE_EXTERNAL_EMOJIS',
		'SEND_MESSAGES',
		'EMBED_LINKS'
	],
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
		membernickname
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
		let amounttoDelete = parseInt(args[0]);
		const user =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[1]);
		if (!args[0]) {
			const notargembed = botembed
				.setDescription(
					`**Purge message:**\n` +
						`<a:Arrow:${arrowemoji}>┊\`${prefix}purge [Number of messages]\`\n` +
						`**Purge user messages:**\n` +
						`<a:Arrow:${arrowemoji}>┊\`${prefix}purge [Number of messages] [@user#0001]\`\n`
				)
				.setColor(`${infocolour}`);
			return botsend
				.send({
					embed: notargembed
				})
				.then(m => {
					m.delete({ timeout: 15000 }).catch(err => undefined);
				})
				.catch(err => {});
		}

		let startembed;
		if (user) {
			startembed = botembed.setDescription(
				`<a:Error:${erroremoji}>**┊Argument Incorrect!**\n<a:Arrow:${arrowemoji}>┊\`${prefix}purge [Number of messages] [@user#0001]\``
			);
		} else {
			startembed = botembed.setDescription(
				`<a:Error:${erroremoji}>**┊Argument Incorrect!**\n<a:Arrow:${arrowemoji}>┊\`${prefix}purge [Number of messages]\``
			);
		}
		if (args[0].toLowerCase() === 'all') {
			amounttoDelete = 100;
		} else if (isNaN(args[0])) {
			return botsend
				.send(startembed.setColor(`${warncolour}`))
				.then(m => {
					m.delete({ timeout: 15000 }).catch(err => undefined);
				})
				.catch(err => {});
		}

		let fetched;
		const messages = message.channel.messages.fetch({
			limit: 100
		});

		if (user) {
			if (amounttoDelete < 2) {
				amounttoDelete = 2;
			}
			if (amounttoDelete > 100) {
				amounttoDelete = 100;
			}
			const filterBy = user ? user.id : client.user.id;
			fetched = (await messages)
				.filter(m => m.author.id === filterBy && !m.pinned)
				.array()
				.slice(0, amounttoDelete);
		} else {
			if (amounttoDelete < 2) {
				amounttoDelete = 2;
			}
			if (amounttoDelete > 100) {
				amounttoDelete = 100;
			}
			fetched = (await messages)
				.filter(m => !m.pinned)
				.array()
				.slice(0, amounttoDelete);
		}

		const deletedmessage = await message.channel.bulkDelete(fetched, true);
		if (deletedmessage.size > 0 && deletedmessage.size != undefined) {
			let deletedmessageembed;
			deletedmessageembed = botembed.setDescription(
				`<a:Success:${successemoji}>**┊Successfully deleted:**\n**${membernickname}:**\n<a:Arrow:${arrowemoji}>\`┊${
					deletedmessage.size
				} messages!\``
			);
			deletedmessageembed.setColor(`${successcolour}`);

			return botsend
				.send({
					embed: deletedmessageembed
				})
				.then(m => {
					m.delete({ timeout: 5000 }).catch(err => undefined);
				})
				.catch(err => {});
		} else {
			let errorembed = botembed.setDescription(
				`<a:Wrong:${wrongemoji}>**┊Error while deleting messages:**\n` +
					`<a:Arrow:${arrowemoji}>┊\`No messages deleted, make sure the messages aren't over two weeks old!\``
			);
			return botsend
				.send(errorembed.setColor(`${errorcolour}`))
				.then(m => {
					m.delete({ timeout: 20000 }).catch(err => {});
				})
				.catch(err => {});
		}
	}
};
/**/
