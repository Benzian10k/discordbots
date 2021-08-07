/*message*/
module.exports = async (client, message) => {
	const CurrencySystem = require('currency-system');
	const cs = new CurrencySystem();
	const errorSchema = require('../../models/Channels/error');
	const adminroleSchema = require('../../models/Guild/adminrole');
	const modroleSchema = require('../../models/Guild/modrole');
	const prefixSchema = require('../../models/User/prefix');
	const { Discord, Permissions } = require('discord.js');
	let PermissionFlags = Object.keys(Permissions.FLAGS);
	const { MessageEmbed } = require('discord.js');
	const ms = require('ms');
	const {
		Botname,
		Botowner,
		Botpassword,
		Botport,
		Botstatus,
		Defaultprefix
	} = require('../../config/Bot.json');
	const {
		Errorchannel,
		Feedbackchannel
	} = require('../../config/Channel.json');
	const {
		Colour,
		Economycolour,
		Errorcolour,
		Infocolour,
		Successcolour,
		Warncolour
	} = require('../../config/Color.json');
	const {
		Adminemoji,
		Arrowemoji,
		Backwardemoji,
		Economyemoji,
		Emojilistemoji,
		Erroremoji,
		Exitemoji,
		Forwardemoji,
		Globalemoji,
		Infoemoji,
		Miscemoji,
		Modemoji,
		Settingsemoji,
		Successemoji,
		Wrongemoji
	} = require('../../config/Emoji.json');

	if (message.author.bot) {
		return;
	}
	/*dm*/
	if (message.channel.type === 'dm') {
		return;
	}
	/*text*/
	let botsend;
	const channelauthor = ['USE_EXTERNAL_EMOJIS', 'SEND_MESSAGES', 'EMBED_LINKS'];
	if (channelauthor.length) {
		let invalidchannelauthor = [];
		for (const perm of channelauthor) {
			if (!channelauthor.includes(perm)) {
				return;
			}
			if (!message.guild.me.hasPermission('ADMINISTRATOR')) {
				if (!message.guild.me.permissionsIn(message.channel).has(perm)) {
					invalidchannelauthor.push(perm);
				}
			}
		}
		if (invalidchannelauthor.length) {
			botsend = message.author;
		} else {
			botsend = message.channel;
		}
	}

	let prefix;
	const prefixData = await prefixSchema
		.findOne({
			prefixid: message.author.id
		})
		.catch(err => {});
	if (prefixData) {
		prefix = prefixData.prefix;
	} else {
		prefix = Defaultprefix;
	}

	let botowner = Botowner;

	let errorchannel;
	let errorchannelData = await errorSchema
		.findOne({
			errorid: `${botowner}`
		})
		.catch(err => {});
	if (!errorchannelData) {
		errorchannel = client.channels.cache.get(`${Errorchannel}`);
	} else {
		errorchannel = client.channels.cache.get(`${errorchannelData.error}`);
	}

	let economycolour = Economycolour;

	let errorcolour = Errorcolour;

	let infocolour = Infocolour;

	let colour = Colour;

	let successcolour = Successcolour;

	let warncolour = Warncolour;

	let adminemoji = Adminemoji;

	let arrowemoji = Arrowemoji;

	let backwardemoji = Backwardemoji;

	let economyemoji = Economyemoji;

	let emojilistemoji = Emojilistemoji;

	let erroremoji = Erroremoji;

	let exitemoji = Exitemoji;

	let forwardemoji = Forwardemoji;

	let globalemoji = Globalemoji;

	let miscemoji = Miscemoji;

	let modemoji = Modemoji;

	let infoemoji = Infoemoji;

	let settingsemoji = Settingsemoji;

	let successemoji = Successemoji;

	let wrongemoji = Wrongemoji;

	let useravatar;

	let usernickname;

	let member = message.guild.member(message.author);

	let membernickname = member ? member.displayName : message.author.username;
	let tom = message.guild.member(client.user);
	let botnickname = tom ? tom.displayName : client.user.username;

	let target;

	let cotarget = message.mentions.users.first();

	if (cotarget) {
		let comember = message.guild.member(cotarget);
		usernickname = comember ? comember.displayName : cotarget.username;
		useravatar = cotarget.displayAvatarURL();
		target = cotarget;
	} else {
		usernickname = membernickname;
		useravatar = message.author.displayAvatarURL();
		target = message.author;
	}

	let defaultcash = 100;
	let defaultbank = 500;
	cs.setDefaultWalletAmount(defaultcash);
	cs.setDefaultBankAmount(defaultbank);

	let botembed = new MessageEmbed()
		.setAuthor(membernickname, message.author.displayAvatarURL())
		.setFooter(botnickname, client.user.displayAvatarURL())
		.setTimestamp();

	if (message.content === `<@${client.user.id}>`) {
		if (
			message.guild.me.permissionsIn(message.channel).has('MANAGE_MESSAGES') ||
			message.guild.me.hasPermission('ADMINISTRATOR')
		) {
			message.delete().catch(err => undefined);
		}
		return botsend
			.send(
				botembed
					.addField(
						`${membernickname}'s Prefix:`,
						`<a:Arrow:${arrowemoji}>┊\`${prefix}\``
					)
					.setColor(`${infocolour}`)
			)
			.then(m => {
				m.delete({ timeout: 12000 }).catch(err => undefined);
			})
			.catch(err => {
				if (errorchannel) {
					errorchannel
						.send({
							embed: {
								color: `${errorcolour}`,
								author: {
									name: `Usage: Prefix`,
									icon_url: `${message.guild.iconURL({
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

	const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const prefixRegex = new RegExp(
		`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
	);

	if (!prefixRegex.test(message.content)) {
		return nitro();
	}

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const server = message.guild;
	const args = message.content
		.slice(matchedPrefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	const command =
		client.commands.get(cmd) ||
		client.commands.find(a => a.aliases && a.aliases.includes(cmd));
	async function nitro() {
		let msg = message.content;
		let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g);
		if (!emojis) return;

		emojis.forEach(m => {
			let emoji = client.emojis.cache.find(x => x.name === m);
			if (!emoji) return;
			let temp = emoji.toString();

			if (new RegExp(temp, 'g').test(msg))
				msg = msg.replace(new RegExp(temp, 'g'), emoji.toString());
			else msg = msg.replace(new RegExp(':' + m + ':', 'g'), emoji.toString());
		});

		if (msg === message.content) return;

		let everyonerole = message.guild.roles.cache.find(
			r => r.name === '@everyone'
		);
		if (
			!everyonerole.permissionsIn(message.channel).has('USE_EXTERNAL_EMOJIS')
		) {
			if (
				message.guild.me
					.permissionsIn(message.channel)
					.has('MANAGE_MESSAGES') ||
				message.guild.me.hasPermission('ADMINISTRATOR')
			) {
				message.delete().catch(err => undefined);
			}
			let exx = 'USE_EXTERNAL_EMOJIS';
			let ext =
				exx[0].toUpperCase() +
				exx
					.toLowerCase()
					.slice(1)
					.replace(/_/g, ' ');
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>┊**Required permission for everyone:**\n<a:Arrow:${arrowemoji}>┊\`${ext}\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 15000 }).catch(err => undefined);
				})
				.catch(err => {
					if (errorchannel) {
						errorchannel
							.send({
								embed: {
									color: `${errorcolour}`,
									author: {
										name: `Usage: Nitro`,
										icon_url: `${message.guild.iconURL({
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

		if (!message.guild.me.hasPermission('ADMINISTRATOR')) {
			const channelauthor = [
				'MANAGE_WEBHOOKS',
				'SEND_MESSAGES',
				'MANAGE_MESSAGES',
				'USE_EXTERNAL_EMOJIS'
			];
			if (channelauthor.length) {
				let invalidchannelauthor = [];
				for (const perm of channelauthor) {
					if (!channelauthor.includes(perm)) {
						return;
					}
					if (!message.guild.me.hasPermission('ADMINISTRATOR')) {
						if (!message.guild.me.permissionsIn(message.channel).has(perm)) {
							invalidchannelauthor.push(perm);
						}
					}
				}

				if (invalidchannelauthor.length) {
					if (
						message.guild.me
							.permissionsIn(message.channel)
							.has('MANAGE_MESSAGES') ||
						message.guild.me.hasPermission('ADMINISTRATOR')
					) {
						message.delete().catch(err => undefined);
					}
					let ext = invalidchannelauthor
						.map(
							value =>
								`${value[0].toUpperCase() +
									value
										.toLowerCase()
										.slice(1)
										.replace(/_/g, ' ')}`
						)
						.join(`, `);

					return botsend
						.send(
							botembed
								.setDescription(
									`<a:Error:${erroremoji}>┊**Required permission for ${botnickname} in message channel:**\n<a:Arrow:${arrowemoji}>┊\`${ext}\``
								)
								.setColor(`${warncolour}`)
						)
						.then(m => {
							m.delete({ timeout: 15000 }).catch(err => undefined);
						})
						.catch(err => {
							if (errorchannel) {
								errorchannel
									.send({
										embed: {
											color: `${errorcolour}`,
											author: {
												name: `Usage: Nitro`,
												icon_url: `${message.guild.iconURL({
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
			}
		}

		let webhook = await message.channel.fetchWebhooks();
		let number = randomNumber(1, 2);
		webhook = webhook.find(x => x.name === `${client.user.username}` + number);
		if (!webhook) {
			webhook = await message.channel.createWebhook(
				`${client.user.username}` + number,
				{
					avatar: client.user.displayAvatarURL({ dynamic: true })
				}
			);
		}
		await webhook.edit({
			name: message.member.nickname
				? message.member.nickname
				: message.author.username,
			avatar: message.author.displayAvatarURL({ dynamic: true })
		});
		message.delete().catch(err => {});
		await webhook.send(msg).catch(err => {});
		await webhook.edit({
			name: `${client.user.username}` + number,
			avatar: client.user.displayAvatarURL({ dynamic: true })
		});
	}

	if (command) {
		let CommandName =
			command.name.charAt(0).toUpperCase() + command.name.slice(1);
		if (command.botowner) {
			if (message.author.id != botowner) {
				return;
			}
		}
		if (!errorchannel) {
			console.log(`Error in Error Channel data!`);
		}
		if (
			message.guild.me.permissionsIn(message.channel).has('MANAGE_MESSAGES') ||
			message.guild.me.hasPermission('ADMINISTRATOR')
		) {
			message.delete().catch(err => undefined);
		}

		if (command.mod) {
			let modrole;
			const modroledata = await modroleSchema.findOne({
				modroleid: message.guild.id
			});

			if (modroledata) {
				modrole = modroledata.modrole;
			}
			let adminrole;
			const adminroledata = await adminroleSchema.findOne({
				adminroleid: message.guild.id
			});

			if (adminroledata) {
				adminrole = adminroledata.adminrole;
			}
			if (!adminroledata) {
				return botsend
					.send(
						botembed
							.setDescription(
								`<a:Error:${erroremoji}>┊Please add adminrole before using Admin and Mod command's!`
							)
							.setColor(`${warncolour}`)
					)
					.then(m => {
						m.delete({ timeout: 15000 }).catch(err => undefined);
					})
					.catch(err => {
						if (errorchannel) {
							errorchannel
								.send({
									embed: {
										color: `${errorcolour}`,
										author: {
											name: `Permissions: Mod`,
											icon_url: `${message.guild.iconURL({
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
			if (!modroledata) {
				return botsend
					.send(
						botembed
							.setDescription(
								`<a:Error:${erroremoji}>┊Please add modrole before using Mod command's!`
							)
							.setColor(`${warncolour}`)
					)
					.then(m => {
						m.delete({ timeout: 15000 }).catch(err => undefined);
					})
					.catch(err => {
						if (errorchannel) {
							errorchannel
								.send({
									embed: {
										color: `${errorcolour}`,
										author: {
											name: `Permissions: Mod`,
											icon_url: `${message.guild.iconURL({
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
			if (!message.member.hasPermission('ADMINISTRATOR')) {
				if (!message.member.roles.cache.has(`${adminrole}`)) {
					if (!message.member.roles.cache.has(`${modrole}`)) {
						return botsend
							.send(
								botembed
									.setDescription(
										`<a:Error:${erroremoji}>┊**${membernickname} Command Permission Level:**\n<a:Arrow:${arrowemoji}>┊\`Mod\``
									)
									.setColor(`${warncolour}`)
							)
							.then(m => {
								m.delete({ timeout: 15000 }).catch(err => undefined);
							})
							.catch(err => {
								if (errorchannel) {
									errorchannel
										.send({
											embed: {
												color: `${errorcolour}`,
												author: {
													name: `Permissions: Mod`,
													icon_url: `${message.guild.iconURL({
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
				}
			}
		}

		if (command.admin) {
			let adminrole;
			const adminroledata = await adminroleSchema.findOne({
				adminroleid: message.guild.id
			});
			if (adminroledata) {
				adminrole = adminroledata.adminrole;
			}
			if (!adminroledata) {
				return botsend
					.send(
						botembed
							.setDescription(
								`<a:Error:${erroremoji}>┊Please add adminrole before using Admin command's!`
							)
							.setColor(`${warncolour}`)
					)
					.then(m => {
						m.delete({ timeout: 15000 }).catch(err => undefined);
					})
					.catch(err => {
						if (errorchannel) {
							errorchannel
								.send({
									embed: {
										color: `${errorcolour}`,
										author: {
											name: `Permissions: Admin`,
											icon_url: `${message.guild.iconURL({
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
			if (!message.member.hasPermission('ADMINISTRATOR')) {
				if (!message.member.roles.cache.has(`${adminrole}`)) {
					return botsend
						.send(
							botembed
								.setDescription(
									`<a:Error:${erroremoji}>┊**${membernickname} Command Permission Level:**\n<a:Arrow:${arrowemoji}>┊\`Admin\``
								)
								.setColor(`${warncolour}`)
						)
						.then(m => {
							m.delete({ timeout: 15000 }).catch(err => undefined);
						})
						.catch(err => {
							if (errorchannel) {
								errorchannel
									.send({
										embed: {
											color: `${errorcolour}`,
											author: {
												name: `Permissions: Admin`,
												icon_url: `${message.guild.iconURL({
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
			}
		}

		if (command.guildowner) {
			if (message.author.id != message.guild.owner.id) {
				return botsend
					.send(
						botembed
							.setDescription(
								`<a:Error:${erroremoji}>┊**${membernickname} Command Permission Level:**\n<a:Arrow:${arrowemoji}>┊\`Server Owner\``
							)
							.setColor(`${warncolour}`)
					)
					.then(m => {
						m.delete({ timeout: 15000 }).catch(err => undefined);
					})
					.catch(err => {
						if (errorchannel) {
							errorchannel
								.send({
									embed: {
										color: `${errorcolour}`,
										author: {
											name: `Permissions: Guild Owner`,
											icon_url: `${message.guild.iconURL({
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
		}

		if (command.UserRolePermission) {
			const roleperm = PermissionFlags;
			if (command.UserRolePermission.length) {
				if (!message.member.hasPermission('ADMINISTRATOR')) {
					let invalidPerms = [];
					for (const perm of command.UserRolePermission) {
						if (!roleperm.includes(perm)) {
							return;
						}
						if (!message.member.hasPermission(perm)) {
							invalidPerms.push(perm);
						}
					}
					if (invalidPerms.length) {
						let ext = invalidPerms
							.map(
								value =>
									`${value[0].toUpperCase() +
										value
											.toLowerCase()
											.slice(1)
											.replace(/_/g, ' ')}`
							)
							.join(`, `);

						return botsend
							.send(
								botembed
									.setDescription(
										`<a:Error:${erroremoji}>┊**Required permission for ${membernickname} on server role:**\n<a:Arrow:${arrowemoji}>┊\`${ext}\``
									)
									.setColor(`${warncolour}`)
							)
							.then(m => {
								m.delete({ timeout: 15000 }).catch(err => undefined);
							})
							.catch(err => {
								if (errorchannel) {
									errorchannel
										.send({
											embed: {
												color: `${errorcolour}`,
												author: {
													name: `Permissions: UserRolePermission`,
													icon_url: `${message.guild.iconURL({
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
				}
			}
		}
		if (command.BotRolePermission) {
			const roleperm = PermissionFlags;
			if (command.BotRolePermission.length) {
				if (!message.guild.me.hasPermission('ADMINISTRATOR')) {
					let invalidPerms = [];
					for (const perm of command.BotRolePermission) {
						if (!roleperm.includes(perm)) {
							return;
						}
						if (!message.guild.me.hasPermission(perm)) {
							invalidPerms.push(perm);
						}
					}
					if (invalidPerms.length) {
						let ext = invalidPerms
							.map(
								value =>
									`${value[0].toUpperCase() +
										value
											.toLowerCase()
											.slice(1)
											.replace(/_/g, ' ')}`
							)
							.join(`, `);

						return botsend
							.send(
								botembed
									.setDescription(
										`<a:Error:${erroremoji}>┊**Required permission for ${botnickname} on server role:**\n<a:Arrow:${arrowemoji}>┊\`${ext}\``
									)
									.setColor(`${warncolour}`)
							)
							.then(m => {
								m.delete({ timeout: 15000 }).catch(err => undefined);
							})
							.catch(err => {
								if (errorchannel) {
									errorchannel
										.send({
											embed: {
												color: `${errorcolour}`,
												author: {
													name: `Permissions: BotRolePermission`,
													icon_url: `${message.guild.iconURL({
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
				}
			}
		}

		if (command.UserChannelPermission) {
			const channelperm = PermissionFlags;
			if (command.UserChannelPermission.length) {
				if (!message.member.hasPermission('ADMINISTRATOR')) {
					let invalidPerms = [];
					for (const perm of command.UserChannelPermission) {
						if (!channelperm.includes(perm)) {
							return;
						}
						if (!message.member.permissionsIn(message.channel).has(perm)) {
							invalidPerms.push(perm);
						}
					}
					if (invalidPerms.length) {
						let ext = invalidPerms
							.map(
								value =>
									`${value[0].toUpperCase() +
										value
											.toLowerCase()
											.slice(1)
											.replace(/_/g, ' ')}`
							)
							.join(`, `);
						return botsend
							.send(
								botembed
									.setDescription(
										`<a:Error:${erroremoji}>┊**Required permission for ${botnickname} in message channel:**\n<a:Arrow:${arrowemoji}>┊\`${ext}\``
									)
									.setColor(`${warncolour}`)
							)
							.then(m => {
								m.delete({ timeout: 15000 }).catch(err => unescape);
							})
							.catch(err => {
								if (errorchannel) {
									errorchannel
										.send({
											embed: {
												color: `${errorcolour}`,
												author: {
													name: `Permissions: UserChannelPermission`,
													icon_url: `${message.guild.iconURL({
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
				}
			}
		}
		if (command.BotChannelPermission) {
			const channelperm = PermissionFlags;
			if (command.BotChannelPermission.length) {
				if (!message.guild.me.hasPermission('ADMINISTRATOR')) {
					let invalidPerms = [];
					for (const perm of command.BotChannelPermission) {
						if (!channelperm.includes(perm)) {
							return;
						}
						if (!message.guild.me.permissionsIn(message.channel).has(perm)) {
							invalidPerms.push(perm);
						}
					}
					if (invalidPerms.length) {
						let ext = invalidPerms
							.map(
								value =>
									`${value[0].toUpperCase() +
										value
											.toLowerCase()
											.slice(1)
											.replace(/_/g, ' ')}`
							)
							.join(`, `);
						return botsend
							.send(
								botembed
									.setDescription(
										`<a:Error:${erroremoji}>┊**Required permission for ${botnickname} in message channel:**\n<a:Arrow:${arrowemoji}>┊\`${ext}\``
									)
									.setColor(`${warncolour}`)
							)
							.then(m => {
								m.delete({ timeout: 15000 }).catch(err => unescape);
							})
							.catch(err => {
								if (errorchannel) {
									errorchannel
										.send({
											embed: {
												color: `${errorcolour}`,
												author: {
													name: `Permissions: BotChannelPermission`,
													icon_url: `${message.guild.iconURL({
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
				}
			}
		}

		command
			.run(
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
			)
			.catch(err => {
				if (errorchannel) {
					errorchannel
						.send({
							embed: {
								color: `${errorcolour}`,
								author: {
									name: `Command Name: ${command.name}`,
									icon_url: `${message.guild.iconURL({
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

function getDuraction(ms) {
	if (ms === 0) {
		return false;
	}
	let date = new Date(ms);
	let seconds = date.getUTCSeconds() ? date.getUTCSeconds() + ' Seconds' : '';
	let minutes = date.getUTCMinutes() ? date.getUTCMinutes() + ' Minutes, ' : '';
	let hours = date.getUTCHours() ? date.getUTCHours() + ' Hours, ' : '';
	let days = date.getUTCDate() - 1 ? date.getUTCDate() - 1 + ' Days, ' : '';
	let time = seconds + minutes + hours + days;
	if (time === '') {
		return false;
	}
	return time;
}

function randomNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**/

/* Example Codes*/

/*Embed without package*/
/*
const exampleEmbed = {
	color: 0x0099ff,
	title: 'Some title',
	url: 'https://discord.js.org',
	author: {
		name: 'Some name',
		icon_url: 'https://i.imgur.com/AfFp7pu.png',
		url: 'https://discord.js.org',
	},
	description: 'Some description here',
	thumbnail: {
		url: 'https://i.imgur.com/AfFp7pu.png',
	},
	fields: [
		{
			name: 'Regular field title',
			value: 'Some value here',
		},
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Inline field title',
			value: 'Some value here',
			inline: true,
		},
	],
	image: {
		url: 'https://i.imgur.com/AfFp7pu.png',
	},
	timestamp: new Date(),
	footer: {
		text: 'Some footer text here',
		icon_url: 'https://i.imgur.com/AfFp7pu.png',
	},
};

channel.send({ embeds: [exampleEmbed] });*/
/**/
