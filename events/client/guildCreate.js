/*if bot join*/
module.exports = async (client, guild) => {
	const { MessageAttachment, MessageEmbed, Message } = require('discord.js');
	const { Botowner, Defaultprefix } = require('../../config/Bot.json');
	/*join*/
	const { Logchannel } = require('../../config/Channel.json');
	const logSchema = require('../../models/Channels/log');
	const errorSchema = require('../../models/Channels/error');
	const { Errorchannel } = require('../../config/Channel.json');
	const { Arrowemoji, Wrongemoji } = require('../../config/Emoji.json');
	const { Errorcolour } = require('../../config/Color.json');

	let arrowemoji = Arrowemoji;
	let errorcolour = Errorcolour;
	let wrongemoji = Wrongemoji;
	let errorchannel;
	let errorchannelData = await errorSchema.findOne({
		errorid: `${Botowner}`
	});
	if (!errorchannelData) {
		errorchannel = client.channels.cache.get(`${Errorchannel}`);
	} else {
		errorchannel = client.channels.cache.get(`${errorchannelData.error}`);
	}

	let logchannel;
	let logchannelData = await logSchema
		.findOne({
			logid: `${Botowner}`
		})
		.catch(err => {});
	if (!logchannelData) {
		logchannel = client.channels.cache.get(`${Logchannel}`);
	} else {
		logchannel = client.channels.cache.get(`${logchannelData.log}`);
	}
	if (logchannel) {
		/*Bot Join*/
		logchannel
			.send({
				embed: {
					author: {
						name: 'New Server Joined!',
						icon_url: `${guild.iconURL({ dynamic: true, size: 4096 })}`
					},
					fields: [
						{
							name: `Server Name:`,
							value: `<a:Arrow:${arrowemoji}>┊${guild.name}`,
							inline: false
						},
						{
							name: `Server Id:`,
							value: `<a:Arrow:${arrowemoji}>┊${guild.id}`,
							inline: false
						},
						{
							name: `Server Owner Id:`,
							value: `<a:Arrow:${arrowemoji}>┊${guild.ownerID}`,
							inline: false
						},
						{
							name: `Server Voice Channels:`,
							value: `<a:Arrow:${arrowemoji}>┊${
								guild.channels.cache.filter(c => c.type === 'voice').size
							}`,
							inline: false
						},
						{
							name: `Server Text Channels:`,
							value: `<a:Arrow:${arrowemoji}>┊${
								guild.channels.cache.filter(c => c.type === 'text').size
							}`,
							inline: false
						},
						{
							name: `Server All Channels:`,
							value: `<a:Arrow:${arrowemoji}>┊${
								guild.channels.cache.filter(c => c.type !== 'category').size
							}`,
							inline: false
						},
						{
							name: `Server Category:`,
							value: `<a:Arrow:${arrowemoji}>┊${
								guild.channels.cache.filter(c => c.type === 'category').size
							}`,
							inline: false
						},
						{
							name: `Server Roles:`,
							value: `<a:Arrow:${arrowemoji}>┊${guild.roles.cache.size}`,
							inline: false
						},
						{
							name: `Server Normal Emojis:`,
							value: `<a:Arrow:${arrowemoji}>┊${
								guild.emojis.cache.filter(e => !e.animated).size
							}`,
							inline: false
						},
						{
							name: `Server Animated Emojis:`,
							value: `<a:Arrow:${arrowemoji}>┊${
								guild.emojis.cache.filter(e => e.animated).size
							}`,
							inline: false
						},
						{
							name: `Server All Emojis:`,
							value: `<a:Arrow:${arrowemoji}>┊${guild.emojis.cache.size}`,
							inline: false
						},
						{
							name: `Server Created Date:`,
							value: `<a:Arrow:${arrowemoji}>┊${guild.createdAt}`
						},
						{
							name: `Server Total Members:`,
							value: `<a:Arrow:${arrowemoji}>┊${guild.memberCount}`
						},
						{
							name: `Server Icon:`,
							value: `<a:Arrow:${arrowemoji}>┊[Click Here](${guild.iconURL({
								dynamic: true,
								size: 4096
							})})`,
							inline: false
						}
					],
					thumbnail: {
						url: `${guild.iconURL({ dynamic: true, size: 4096 })}`
					},
					color: `74F4F3`,
					timestamp: new Date(),
					footer: {
						text: `Currently in ${client.guilds.cache.size} guilds!`,
						icon_url: `${client.user.displayAvatarURL({
							dynamic: true,
							size: 4096
						})}`
					}
				}
			})
			.catch(err => {
				if (errorchannel) {
					errorchannel
						.send({
							embed: {
								color: `${errorcolour}`,
								author: {
									name: `Event: guildCreate`,
									icon_url: `${guild.iconURL({
										dynamic: true,
										size: 4096
									})}`
								},
								description: `<a:Wrong:${wrongemoji}>┊${err}`,
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
						.catch(err => {
							console.log(err);
						});
				} else {
					console.log(err);
				}
			});
	}
	/*bot join first message*/
	let ChannelToSend;
	guild.channels.cache.forEach(channel => {
		if (
			channel.type === 'text' &&
			!ChannelToSend &&
			channel.permissionsFor(guild.me).has('SEND_MESSAGES')
		) {
			ChannelToSend = channel;
		}
	});
	if (ChannelToSend) {
		ChannelToSend.send({
			embed: {
				author: {
					name: `Hello, ${guild.name} Members!`,
					icon_url: `${guild.iconURL({ dynamic: true, size: 4096 })}`
				},
				description: `Thank for inviting me, My default prefix is \`${Defaultprefix}\` and i will be happy to help you out in this server \`${Defaultprefix}help\` to get my all commands!`,
				thumbnail: {
					url: `${guild.iconURL({ dynamic: true, size: 4096 })}`
				},
				fields: [
					{
						name: `Server Name:`,
						value: `<a:Arrow:${arrowemoji}>┊${guild.name}`,
						inline: false
					},
					{
						name: `Server Id:`,
						value: `<a:Arrow:${arrowemoji}>┊${guild.id}`,
						inline: false
					},
					{
						name: `Server Owner Id:`,
						value: `<a:Arrow:${arrowemoji}>┊${guild.ownerID}`,
						inline: false
					},
					{
						name: `Server Voice Channels:`,
						value: `<a:Arrow:${arrowemoji}>┊${
							guild.channels.cache.filter(c => c.type === 'voice').size
						}`,
						inline: false
					},
					{
						name: `Server Text Channels:`,
						value: `<a:Arrow:${arrowemoji}>┊${
							guild.channels.cache.filter(c => c.type === 'text').size
						}`,
						inline: false
					},
					{
						name: `Server All Channels:`,
						value: `<a:Arrow:${arrowemoji}>┊${
							guild.channels.cache.filter(c => c.type !== 'category').size
						}`,
						inline: false
					},
					{
						name: `Server Category:`,
						value: `<a:Arrow:${arrowemoji}>┊${
							guild.channels.cache.filter(c => c.type === 'category').size
						}`,
						inline: false
					},
					{
						name: `Server Roles:`,
						value: `<a:Arrow:${arrowemoji}>┊${guild.roles.cache.size}`,
						inline: false
					},
					{
						name: `Server Normal Emojis:`,
						value: `<a:Arrow:${arrowemoji}>┊${
							guild.emojis.cache.filter(e => !e.animated).size
						}`,
						inline: false
					},
					{
						name: `Server Animated Emojis:`,
						value: `<a:Arrow:${arrowemoji}>┊${
							guild.emojis.cache.filter(e => e.animated).size
						}`,
						inline: false
					},
					{
						name: `Server All Emojis:`,
						value: `<a:Arrow:${arrowemoji}>┊${guild.emojis.cache.size}`,
						inline: false
					},
					{
						name: `Server Created Date:`,
						value: `<a:Arrow:${arrowemoji}>┊${guild.createdAt}`
					},
					{
						name: `Server Total Members:`,
						value: `<a:Arrow:${arrowemoji}>┊${guild.memberCount}`
					},
					{
						name: `Server Icon:`,
						value: `<a:Arrow:${arrowemoji}>┊[Click Here](${guild.iconURL({
							dynamic: true,
							size: 4096
						})})`,
						inline: false
					}
				],
				color: `74F4F3`,
				timestamp: new Date(),
				footer: {
					text: `${client.user.username}`,
					icon_url: `${client.user.displayAvatarURL({
						dynamic: true,
						size: 4096
					})}`
				}
			}
		}).catch(err => {
			if (errorchannel) {
				errorchannel
					.send({
						embed: {
							color: `${errorcolour}`,
							author: {
								name: `Event: guildCreate`,
								icon_url: `${guild.iconURL({
									dynamic: true,
									size: 4096
								})}`
							},
							description: `<a:Wrong:${wrongemoji}>┊${err}`,
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
					.catch(err => {
						console.log(err);
					});
			} else {
				console.log(err);
			}
		});
	}
};
/**/
