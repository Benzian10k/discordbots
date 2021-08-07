/*Use*/
module.exports = {
	name: 'use',
	category: 'Economy',
	description: 'A way to use inventory items!',
	usage: 'use [amount] [item]',
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
		infoemoji
	) => {
		const Discord = require('discord.js');
		const CurrencySystem = require('currency-system');
		const cs = new CurrencySystem();
		const items = require('../../utils/Shop');
		const inverterySchema = require('../../models/Economy/invertery');
		let name = message.content
			.split(' ')
			.slice(2)
			.join(' ');
		let amount = args[0];
		if (!amount) {
			return botsend
				.send(
					botembed
						.setDescription(
							`**Use item:**\n<a:Arrow:${arrowemoji}>┊\`use [amount] [item]\``
						)
						.setColor(`${infocolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
		if (!parseInt(amount)) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Invalid amount:**\n<a:Arrow:${arrowemoji}>┊\`Amount of item that you wanted to use must be whole number\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}

		const realname = name.toLowerCase();
		const validitems = !!items.find(
			item => item.name.toLowerCase() === `${realname}`
		);
		if (!validitems) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Invalid item:**\n<a:Arrow:${arrowemoji}>┊\`${name}\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
		const itememoji = items.find(
			item => item.name.toLowerCase() === `${realname}`
		).emoji;
		const minimum = items.find(
			item => item.name.toLowerCase() === `${realname}`
		).minwin;
		const maximum = items.find(
			item => item.name.toLowerCase() === `${realname}`
		).maxwin;
		let usedata = await inverterySchema.findOne({
			inverteryid: message.author.id
		});
		if (!usedata) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Empty inventory:**\n<a:Arrow:${arrowemoji}>┊\`You have nothing in you inventory\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
		const usename = Object.keys(usedata.invertery)
			.map(key => {
				return `${key}`;
			})
			.join(`\n`);
		if (!usename.includes(realname)) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Item not exist:**\n<a:Arrow:${arrowemoji}>┊\`The item that you wanted to use is not in your inventory\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
		const params = {
			inverteryid: message.author.id
		};
		const itiems = Object.keys(usedata.invertery).includes(realname);
		if (usedata) {
			if (usedata.invertery[realname] < 1) {
				return botsend
					.send(
						botembed
							.setDescription(
								`<a:Error:${erroremoji}>**┊Inventory item ran out:**\n<a:Arrow:${arrowemoji}>┊${itememoji} \`${name}\``
							)
							.setColor(`${warncolour}`)
					)
					.then(m => {
						m.delete({ timeout: 10000 }).catch(err => undefined);
					})
					.catch(err => {});
			}
			if (usedata.invertery[realname] < parseInt(amount)) {
				return botsend
					.send(
						botembed
							.setDescription(
								`<a:Error:${erroremoji}>**┊Inventory item:**\n<a:Arrow:${arrowemoji}>┊ \`You have only ${
									usedata.invertery[realname]
								}\` ${itememoji} \`${name}\``
							)
							.setColor(`${warncolour}`)
					)
					.then(m => {
						m.delete({ timeout: 10000 }).catch(err => undefined);
					})
					.catch(err => {});
			}
		}

		inverterySchema.findOne(params, async (err, data) => {
			if (data) {
				const hasItems = Object.keys(data.invertery).includes(realname);

				data.invertery[realname] -= parseInt(amount);
				await inverterySchema.findOneAndUpdate(params, data);
			}
		});
		let reward = Math.floor(Math.random() * maximum) + minimum;
		let result = await cs.addMoney({
			user: message.author,
			amount: parseInt(reward * amount),
			wheretoPutMoney: 'bank'
		});
		botsend
			.send(
				botembed
					.setDescription(
						`<a:Success:${successemoji}>**┊Successfully used:**\n<a:Arrow:${arrowemoji}>┊${itememoji} \`${realname} and get \`<a:Money:${economyemoji}> \`${parseInt(
							reward * amount
						)} in bank\``
					)
					.setColor(`${economycolour}`)
			)
			.catch(err => {});
	}
};
/**/
