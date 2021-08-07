/*Prefix*/
module.exports = {
	name: 'prefix',
	aliases: ['setprefix', 'set-prefix'],
	category: 'Global',
	description: 'Update your global prefix!',
	usage: 'prefix [new prefix]',
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
		const prefixSchema = require('../../models/User/prefix');
		const { BotPrefixMaxCharcters } = require('../../config/Bot.json');
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
		if (!args[0]) {
			let argembed = botembed
				.setDescription(
					`**Update your prefix:**\n<a:Arrow:${arrowemoji}>┊\`${prefix}prefix [new prefix]\``
				)
				.setColor(`${infocolour}`);

			return botsend
				.send({
					embed: argembed
				})
				.then(m => {
					m.delete({ timeout: 15000 }).catch(err => undefined);
				})
				.catch(err => {});
		}

		if (args[0].length > BotPrefixMaxCharcters) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Maximum characters:**\n<a:Arrow:${arrowemoji}>┊\`${BotPrefixMaxCharcters}\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 15000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
		if (args[0] === `${prefix}`) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Same Prefix:**\n<a:Arrow:${arrowemoji}>┊\`${prefix}\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 15000 }).catch(err => undefined);
				})
				.catch(err => {});
		}

		let data;
		data = await prefixSchema.findOne({
			prefixid: message.author.id
		});
		if (!data) {
			let newdata = await prefixSchema.create({
				prefixid: message.author.id,
				prefix: args[0]
			});
			newdata.save();
		} else {
			await prefixSchema.findOneAndUpdate({
				prefixid: message.author.id,
				prefix: args[0]
			});
		}

		let successembed = botembed
			.setDescription(
				`<a:Successfull:${successemoji}>**┊Successfully updated ${membernickname} prefix:**\n<a:Arrow:${arrowemoji}>┊\`${
					args[0]
				}\``
			)
			.setColor(`${successcolour}`);

		await botsend
			.send({
				embed: successembed
			})
			.then(m => {
				m.delete({ timeout: 25000 }).catch(err => undefined);
			})
			.catch(err => {});
	}
};
/**/
