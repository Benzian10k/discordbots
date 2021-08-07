/*Setadminrole*/
module.exports = {
	name: 'setadminrole',
	aliases: ['set-adminrole'],
	category: 'Settings',
	description: 'Set your server adminrole!',
	usage: 'adminrole [@your adminrole]',
	BotChannelPermission: ['USE_EXTERNAL_EMOJIS', 'SEND_MESSAGES', 'EMBED_LINKS'],
	UserRolePermission: ['ADMINISTRATOR'],
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
		const adminroleSchema = require('../../models/Guild/adminrole');
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

		const currentadminroledata = await adminroleSchema
			.findOne({ adminroleid: message.guild.id })
			.catch(err => {});

		const adminrole =
			message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
		if (!args[0]) {
			let argembed;
			if (currentadminroledata) {
				argembed = botembed
					.setColor(`${infocolour}`)
					.setDescription(
						`**Update server adminrole:**\n<a:Arrow:${arrowemoji}>┊\`${prefix}adminrole [@your adminrole]\``
					);
			} else {
				argembed = botembed
					.setColor(`${infocolour}`)
					.setDescription(
						`**Set server adminrole:**\n<a:Arrow:${arrowemoji}>┊\`${prefix}adminrole [@your adminrole]\``
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
		if (!adminrole) {
			return botsend
				.send(
					botembed
						.setColor(`${warncolour}`)
						.setDescription(
							`<a:Error:${erroremoji}>**┊Invalid adminrole:**\n<a:Arrow:${arrowemoji}>┊${
								args[0]
							}`
						)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}

		if (currentadminroledata) {
			if (currentadminroledata.adminrole === adminrole.id) {
				return botsend
					.send(
						botembed
							.setColor(`${warncolour}`)
							.setDescription(
								`<a:Error:${erroremoji}>**┊Same adminrole:**\n<a:Arrow:${arrowemoji}>┊<@&${
									currentadminroledata.adminrole
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
		data = await adminroleSchema.findOne({
			adminroleid: message.guild.id
		});

		if (!data) {
			let newdata = await adminroleSchema.create({
				adminroleid: message.guild.id,

				adminrole: adminrole.id
			});

			newdata.save();
		} else {
			await adminroleSchema.findOneAndUpdate({
				adminroleid: message.guild.id,

				adminrole: adminrole.id
			});
		}

		let lastembed;
		if (currentadminroledata) {
			lastembed = botembed
				.setColor(`${successcolour}`)
				.setDescription(
					`<a:Successful:${successemoji}>**┊Successfully updated adminrole:**\n<a:Arrow:${arrowemoji}>┊${adminrole}`
				);
		} else {
			lastembed = botembed
				.setColor(`${successcolour}`)
				.setDescription(
					`<a:Successful:${successemoji}>**┊Successfully seted adminrole:**\n<a:Arrow:${arrowemoji}>┊${adminrole}`
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
