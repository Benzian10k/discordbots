//---++++++main const++++++---
const Discord = require('discord.js');
const { random } = require('random-code-gen');
//---++++++const Schema++++++---
const emojibackupSchema = require('../../models/User/emojibackup');
//---++++++module export++++++---

module.exports = {
	name: 'emojibackupcreate',
	admin: false,
	aliases: ['ebc'],
	botowner: false,
	category: 'Emoji',
	description: 'create emoji backup for your another server!',
	guildowner: false,
	hidden: false,
	mod: false,
	usage: 'emojibackupcreate',
	userRolePermission: false,
	userChannelPermission: false,
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
		usernickname
	) => {
		let code = random(18);
		let bruh = message.author.id;
		// message.channel.permissionsFor(message.member).has(<permission>)
		let emojis = message.guild.emojis.cache.array();
		let list = [];
		if (emojis.size === 0) {
			return botsend
				.send({
					embed: {
						description: `<a:Wrong:${wrongemoji}>┊**There are no emojis in this Server to backup!**`,
						color: `${errorcolour}`
					}
				})
				.then(m => {
					m.delete({ timeout: 25000 }).catch(err => {});
				})
				.catch(err => {
					errorchannel.send({
						embed: {
							description: `<a:Arrow:${arrowemoji}>┊${err}`,
							color: `${errorcolour}`
						}
					});
				});
		}
		for (var i = 0; i < emojis.length; i += 20) {
			const items = emojis.slice(i, i + 20);
			list.push(items);
		}
		list.push(emojis);
		let data = await emojibackupSchema.create({
			emojicode: code,
			emojibackup: list.toString()
		});
		data.save().catch(err => {
			errorchannel.send({
				embed: {
					description: `<a:Arrow:${arrowemoji}>┊${err}`,
					color: `${errorcolour}`
				}
			});
		});
		message.author
			.send({
				embed: {
					description: `<a:Successfull:${successemoji}>┊Successfully created.\n<a:Arrow:${arrowemoji}>┊Your backup code: ${code}`,
					color: `${successcolour}`
				}
			})
			.then(msg => msg.pin())
			.catch(err => {
				errorchannel.send({
					embed: {
						description: `<a:Arrow:${arrowemoji}>┊${err}`,
						color: `${errorcolour}`
					}
				});
			});
		message.author
			.send({
				embed: {
					description: `${list[0]}`,
					color: `${infocolour}`
				}
			})
			.then(msg => msg.pin())
			.catch(err => {
				errorchannel.send({
					embed: {
						description: `<a:Arrow:${arrowemoji}>┊${err}`,
						color: `${errorcolour}`
					}
				});
			});
	}
};
//---++++++file end++++++---
