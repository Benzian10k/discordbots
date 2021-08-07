/*Inventory*/
module.exports = {
	name: 'inventory',
	aliases: ['inv'],
	category: 'Economy',
	description: 'A way to see your inventory items!',
	usage: 'inventory',
	BotChannelPermission: [
		'USE_EXTERNAL_EMOJIS',
		'SEND_MESSAGES',
		'EMBED_LINKS',
		'ADD_REACTIONS'
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
		membernickname,
		colour,
		infoemoji,
		CommandName,
		command
	) => {
		const inverterySchema = require('../../models/Economy/invertery');
		const items = require('../../utils/Shop');
		const Discord = require('discord.js');
		const CurrencySystem = require('currency-system');
		const cs = new CurrencySystem();

		inverterySchema.findOne(
			{ inverteryid: message.author.id },
			async (err, data) => {
				if (!data) {
					return botsend
						.send(
							botembed
								.setDescription(
									`<a:Error:${erroremoji}>**┊${CommandName}:**\n<a:Arrow:${arrowemoji}>┊\`There are nothing in your inventory\``
								)
								.setColor(`${infocolour}`)
						)
						.then(m => {
							m.delete({ timeout: 10000 }).catch(err => undefined);
						})
						.catch(err => {});
				} else {
					let extradescription = `**${membernickname}'s Invertery:**\nHere's your all invertery items and you can use this items with use command!`;
					let etimeout = 1000 * 60 * 1;
					let listcolour = economycolour;
					let list = [];
					
					const mapdata = Object.keys(data.invertery).map((key, index) => {
						return `**${index + 1}**┊**Name:** :${key}:\` ${key}\`\n**Amount:** \`${
							data.invertery[key]
						}\``;
					});
					for (var i = 0; i < mapdata.length; i += 10) {
						const itms = mapdata.slice(i, i + 10);
						list.push(itms.join('\n\n'));
					}
					const symbols = [
						`${backwardemoji}`,
						`${exitemoji}`,
						`${forwardemoji}`
					];

					let page = 0;
					let park = parseInt(args[0]);
					if (park) {
						if (park > list.length) {
							return botsend
								.send(
									botembed
										.setDescription(
											`<a:Error:${erroremoji}>**┊Maximum pages:**\n<a:Arrow:${arrowemoji}>┊\`There are only ${
												list.length
											} pages\``
										)
										.setColor(`${warncolour}`)
								)
								.then(m => {
									m.delete({ timeout: 10000 }).catch(err => undefined);
								})
								.catch(err => {});
						}
						let e;
						if (park < 1) {
							return botsend
								.send(
									botembed
										.setDescription(
											`<a:Error:${erroremoji}>**┊Minimum pages:**\n<a:Arrow:${arrowemoji}>┊\`Please select between [1 - ${
												list.length
											}]\``
										)
										.setColor(`${warncolour}`)
								)
								.then(m => {
									m.delete({ timeout: 10000 }).catch(err => undefined);
								})
								.catch(err => {});
						}
						e = botembed
							.setDescription(
								`${extradescription}\n\n` + list[page - 1 + parseInt(args[0])]
							)
							.setColor(`${listcolour}`)
							.setFooter(`Page ${page + parseInt(args[0])} of ${list.length}`);

						const msg = await botsend.send(e).catch(err => {});
						symbols.forEach(symbol => msg.react(symbol));
						let doing = true;

						while (doing) {
							let r;
							const filter = (r, u) =>
								symbols.includes(r.emoji.id) && u.id == message.author.id;
							try {
								r = await msg.awaitReactions(filter, {
									max: 1,

									time: etimeout,

									errors: ['time']
								});
							} catch {
								msg.delete().catch(err => undefined);
								return botsend
									.send(
										botembed
											.setDescription(
												`<a:Error:${erroremoji}>**┊${membernickname}:**\n<a:Arrow:${arrowemoji}>┊\`Your time up for ${CommandName}\``
											)
											.setColor(warncolour)
									)
									.then(m => {
										m.delete({ timeout: 10000 }).catch(err => undefined);
									})
									.catch(err => {});
							}

							const u = message.author;

							r = r.first();

							if (r.emoji.id == symbols[2]) {
								if (!list[park])
									msg.reactions

										.resolve(r.emoji.id)

										.users.remove(u.id)

										.catch(err => {});
								else {
									park++;

									msg.reactions

										.resolve(r.emoji.id)

										.users.remove(u.id)

										.catch(err => {});

									let newM = botembed
										.setDescription(`${extradescription}\n\n` + list[park - 1])
										.setColor(`${listcolour}`)
										.setFooter(`Page ${park} of ${list.length}`);

									msg
										.edit(newM)
										.then(m => {
											m.delete({ timeout: etimeout }).catch(err => undefined);
										})
										.catch(err => {});
								}
							} else if (r.emoji.id == symbols[0]) {
								if (!list[park - 2])
									msg.reactions
										.resolve(r.emoji.id)
										.users.remove(u.id)
										.catch(err => {});
								else {
									park--;
									msg.reactions
										.resolve(r.emoji.id)
										.users.remove(u.id)
										.catch(err => {});
									let newM = botembed
										.setDescription(`${extradescription}\n\n` + list[park - 1])
										.setColor(`${listcolour}`)
										.setFooter(`Page ${park} of ${list.length}`);

									msg
										.edit(newM)
										.then(m => {
											m.delete({ timeout: etimeout }).catch(err => undefined);
										})
										.catch(err => {});
								}
							} else if (r.emoji.id == symbols[1]) {
								return msg.delete().catch(err => undefined);
							}
						}
					} else {
						let e = botembed
							.setDescription(`${extradescription}\n\n` + list[page])
							.setColor(`${listcolour}`)
							.setFooter(`Page ${page + 1} of ${list.length}`);

						const msg = await botsend.send(e).catch(err => {});

						symbols.forEach(symbol => msg.react(symbol));

						let doing = true;

						while (doing) {
							let r;

							const filter = (r, u) =>
								symbols.includes(r.emoji.id) && u.id == message.author.id;

							try {
								r = await msg.awaitReactions(filter, {
									max: 1,

									time: etimeout,

									errors: ['time']
								});
							} catch {
								msg.delete().catch(err => undefined);
								return botsend
									.send(
										botembed
											.setDescription(
												`<a:Error:${erroremoji}>**┊${membernickname}:**\n<a:Arrow:${arrowemoji}>┊\`Your time up for ${CommandName}\``
											)
											.setColor(warncolour)
									)
									.then(m => {
										m.delete({ timeout: 10000 }).catch(err => undefined);
									})
									.catch(err => {});
							}

							const u = message.author;

							r = r.first();

							if (r.emoji.id == symbols[2]) {
								if (!list[page + 1])
									msg.reactions

										.resolve(r.emoji.id)

										.users.remove(u.id)

										.catch(err => {});
								else {
									page++;

									msg.reactions

										.resolve(r.emoji.id)

										.users.remove(u.id)

										.catch(err => {});

									let newM = botembed
										.setDescription(`${extradescription}\n\n` + list[page])
										.setColor(`${listcolour}`)
										.setFooter(`Page ${page + 1} of ${list.length}`);

									msg
										.edit(newM)
										.then(m => {
											m.delete({ timeout: etimeout }).catch(err => undefined);
										})
										.catch(err => {});
								}
							} else if (r.emoji.id == symbols[0]) {
								if (!list[page - 1])
									msg.reactions

										.resolve(r.emoji.id)

										.users.remove(u.id)

										.catch(err => {});
								else {
									page--;

									msg.reactions

										.resolve(r.emoji.id)

										.users.remove(u.id)

										.catch(err => {});

									let newM = botembed
										.setDescription(`${extradescription}\n\n` + list[page])
										.setColor(`${listcolour}`)
										.setFooter(`Page ${page + 1} of ${list.length}`);

									msg
										.edit(newM)
										.then(m => {
											m.delete({ timeout: etimeout }).catch(err => undefined);
										})
										.catch(err => {});
								}
							} else if (r.emoji.id == symbols[1]) {
								return msg.delete().catch(err => undefined);
							}
						}
					}
				}
			}
		);
	}
};
/**/
