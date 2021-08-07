/*Buy*/
module.exports = {
	name: 'buy',
	category: 'Economy',
	description: 'A way to buy items from shop!',
	usage: 'buy [amount] [item]',
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
		const items = require('../../utils/Shop');
		const inverterySchema = require('../../models/Economy/invertery');
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

		let pricecash = args[0];
		if (!pricecash) {
			const notargembed = botembed
				.setDescription(
					`**Buy item:**\n` +
						`<a:Arrow:${arrowemoji}>┊\`${prefix}buy [amount] [item]\``
				)
				.setColor(`${infocolour}`);
			return botsend
				.send({
					embed: notargembed
				})
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}

		if (!parseInt(pricecash)) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Invalid amount:**\n<a:Arrow:${arrowemoji}>┊\`Amount of item that you wanted to buy must be whole number\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
		let itemtouy = message.content
			.split(' ')
			.slice(2)
			.join(' ');
		if (!itemtouy) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Item missing:**\n<a:Wrong:${arrowemoji}>┊\`Please specify a item to buy\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
		const itemtobuy = itemtouy.toLowerCase();
		const validitems = !!items.find(
			item => item.name.toLowerCase() === `${itemtobuy}`
		);
		if (!validitems) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Invalid item:**\n<a:Arrow:${arrowemoji}>┊The item that you wanted to buy is not valid`
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
		const itemprice =
			items.find(item => item.name.toLowerCase() === `${itemtobuy}`).price *
			pricecash;
		const itememoji = items.find(
			item => item.name.toLowerCase() === `${itemtobuy}`
		).emoji;
		let result = await cs.balance({
			user: message.author
		});

		const userbalance = `${result.wallet}`;

		if (userbalance < itemprice) {
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Low balance:**\n<a:Arrow:${arrowemoji}>┊\`You only have\` <a:Cash:${economyemoji}> \`${userbalance} cash, the price of ${pricecash}x\` ${itememoji} \`${itemtobuy} is \`<a:Price:${economyemoji}> \`${itemprice} cash\``
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

		inverterySchema.findOne(params, async (err, data) => {
			if (data) {
				const hasItems = Object.keys(data.invertery).includes(itemtobuy);
				if (!hasItems) {
					data.invertery[itemtobuy] = parseInt(pricecash);
				} else {
					data.invertery[itemtobuy] += parseInt(pricecash);
				}
				await inverterySchema.findOneAndUpdate(params, data);
			} else {
				new inverterySchema({
					inverteryid: message.author.id,
					invertery: {
						[itemtobuy]: parseInt(pricecash)
					}
				}).save();
			}
			await cs.removeMoney({
				user: message.author,
				amount: itemprice,
				wheretoPutMoney: 'wallet'
			});
			let donemb = botembed
				.setDescription(
					`<a:Success:${successemoji}>**┊Successfully bought:**\n<a:Arrow:${arrowemoji}>┊\`${pricecash}x\` ${itememoji} \`${itemtobuy} check in your inventory items\``
				)
				.setColor(`${successcolour}`);
			botsend
				.send({
					embed: donemb
				})
				.then(m => {
					m.delete({ timeout: 20000 }).catch(err => undefined);
				})
				.catch(err => {});
		});
	}
};
/**/
