/*Serveremojis*/
module.exports = {
	name: 'serveremojis',
	category: 'Emoji',
	description: 'A way to get all server emojis!',
	usage: 'serveremojis',
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
		const items = message.guild.emojis.cache.array();
		const Discord = require('discord.js');

		let extradescription = `**${
			message.guild.name
		}'s Emojis:**\nHere you can download all of these emojis!`;
		let etimeout = 1000 * 60 * 1;
		let listcolour = colour;
		let list = [];
		if (items.length === 0) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊${CommandName}:**\n<a:Arrow:${arrowemoji}>┊\`There is no emojis\``
						)
						.setColor(warncolour)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
		const emojis = items.map(
			(e, i) =>
				`${i + 1})   ${e}\n**Emoji Name:** \`${e.name}\`\n**Emoji Id:** \`${
					e.id
				}\`\n**Emoji Download Link:** [Click Here](${e.url})`
		);
		for (var i = 0; i < emojis.length; i += 10) {
			const itms = emojis.slice(i, i + 10);
			list.push(itms.join('\n\n'));
		}
		const symbols = [`${backwardemoji}`, `${exitemoji}`, `${forwardemoji}`];

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
};
/**/
