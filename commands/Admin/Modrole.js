/*Setmodrole*/
module.exports = {
	name: 'setmodrole',
	admin: true,
	aliases: ['set-modrole'],
	category: 'Admin',
	description: 'Set your server modrole!',
	usage: 'modrole [@your modrole]',
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
		infoemoji,
		CommandName
	) => {
		const modroleSchema = require('../../models/Guild/modrole');
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

		const currentmodroledata = await modroleSchema
			.findOne({ modroleid: message.guild.id })
			.catch(err => {});

		const modrole =
			message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
		if (!args[0]) {
			let argembed;
			if (currentmodroledata) {
				argembed = botembed
					.setColor(`${infocolour}`)
					.setDescription(
						`**Update server modrole:**\n<a:Arrow:${arrowemoji}>┊\`${prefix}modrole [@your modrole]\``
					);
			} else {
				argembed = botembed
					.setColor(`${infocolour}`)
					.setDescription(
						`**Set server modrole:**\n<a:Arrow:${arrowemoji}>┊\`${prefix}modrole [@your modrole]\``
					);
			}
			return botsend
				.send({
					embed: argembed
				})
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
		if (!modrole) {
			return botsend
				.send(
					botembed
						.setColor(`${warncolour}`)
						.setDescription(
							`<a:Error:${erroremoji}>**┊Invalid modrole:**\n<a:Arrow:${arrowemoji}>┊${
								args[0]
							}`
						)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}

		if (currentmodroledata) {
			if (currentmodroledata.modrole === modrole.id) {
				return botsend
					.send(
						botembed
							.setColor(`${warncolour}`)
							.setDescription(
								`<a:Error:${erroremoji}>**┊Same modrole:**\n<a:Arrow:${arrowemoji}>┊<@&${
									currentmodroledata.modrole
								}>`
							)
					)
					.then(m => {
						m.delete({ timeout: 10000 }).catch(err => undefined);
					})
					.catch(err => {});
			}
		}

		let data;
		data = await modroleSchema.findOne({
			modroleid: message.guild.id
		});

		if (!data) {
			let newdata = await modroleSchema.create({
				modroleid: message.guild.id,

				modrole: modrole.id
			});

			newdata.save();
		} else {
			await modroleSchema.findOneAndUpdate({
				modroleid: message.guild.id,

				modrole: modrole.id
			});
		}
		let lastembed;
		if (currentmodroledata) {
			lastembed = botembed
				.setColor(`${successcolour}`)
				.setDescription(
					`<a:Successful:${successemoji}>**┊Successfully updated modrole:**\n<a:Arrow:${arrowemoji}>┊${modrole}`
				);
		} else {
			lastembed = botembed
				.setColor(`${successcolour}`)
				.setDescription(
					`<a:Successful:${successemoji}>**┊Successfully seted modrole:**\n<a:Arrow:${arrowemoji}>┊${modrole}`
				);
		}
		await botsend
			.send({
				embed: lastembed
			})
			.then(m => {
				m.delete({ timeout: 15000 }).catch(err => undefined);
			})
			.catch(err => {});
	}
};
/**/
