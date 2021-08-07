/*Feedback*/
module.exports = {
	name: 'feedback',
	category: 'Misc',
	description: 'Share your feedback with us!',
	usage: 'feedback [your feedback]',
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
		const { Feedbackchannel } = require('../../config/Channel.json');
		const feedbackSchema = require('../../models/Channels/feedback');

		let feedbacksend;
		let feedbackData = await feedbackSchema.findOne({
			feedbackid: `${botowner}`
		});
		if (!feedbackData) {
			feedbacksend = client.channels.cache.get(`${Feedbackchannel}`);
		} else {
			feedbacksend = client.channels.cache.get(`${feedbackData.feedback}`);
		}

		if (!feedbacksend) {
			return errorchannel
				.send({
					embed: {
						author: {
							name: `Command Name: ${CommandName}`,
							icon_url: `${message.guild.iconURL({
								dynamic: true,
								size: 4096
							})}`
						},
						description: `<a:Wrong:${wrongemoji}>┊Error in feedback channel data!`,
						color: `${errorcolour}`,
						timestamp: new Date(),
						footer: {
							text: `${client.user.username}`,
							icon_url: `${client.user.displayAvatarURL({
								dynamic: true,
								size: 4096
							})}`
						}
					}
				})
				.catch(err => {});
		}
		let feedback = args.join(' ');

		if (!feedback) {
			let argembed = botembed
				.setDescription(
					`**Share your feedback with us:**\n<a:Arrow:${arrowemoji}>┊\`${prefix}feedback [your feedback]\``
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
		feedbacklen = 1800;

		if (feedback.length > feedbacklen) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Maximum characters:**\n<a:Arrow:${arrowemoji}>┊\`${feedbacklen}\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 15000 }).catch(err => undefined);
				})
				.catch(err => {});
		}

		let strfeedback = `**${message.author.username}#${
			message.author.discriminator
		} member of ${
			message.guild.name
		} server!**\n<a:Arrow:${arrowemoji}>┊\`${feedback}\``;

		feedbacksend
			.send({
				embed: {
					author: {
						name: `Received feedback from:`,
						icon_url: `${message.author.displayAvatarURL({
							dynamic: true,
							size: 4096
						})}`
					},
					description: `${strfeedback}`,
					fields: [
						{
							name: `${message.author.username} Id:`,
							value: `<a:Arrow:${arrowemoji}>┊\`${message.author.id}\``
						}
					],
					color: `${infocolour}`,
					timestamp: new Date(),
					footer: {
						text: `${client.user.username}`,
						icon_url: `${client.user.displayAvatarURL({
							dynamic: true,
							size: 4096
						})}`
					}
				}
			})
			.catch(err => {});

		let lastembed = botembed
			.setColor(`${infocolour}`)
			.setDescription(
				`<a:Success:${successemoji}>**┊Successfully sent:**\n<a:Arrow:${arrowemoji}>┊${feedback}`
			);
		message.author
			.send({
				embed: lastembed
			})
			.then(m => {
				m.delete({ timeout: 120000 }).catch(err => undefined);
			})
			.catch(err => {});
	}
};
/**/
