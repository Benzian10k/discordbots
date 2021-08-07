/*Addmoney*/
module.exports = {
	name: 'addmoney',
	aliases: ['add-money'],
	botowner: true,
	category: 'Botowner',
	cooldown: 1000 * 15,
	description: 'A way to add money in user balance!',
	usage: 'addmoney [@user#0000] [amount] [bank/wallet]',
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
		let target;
		let name;
		let cotarget = message.mentions.users.first();
		if (cotarget) {
			target = cotarget;
			name = usernickname;
		}
		if (!args[0]) {
			let argembed = botembed
				.setDescription(
					`**Add money to user balance:**\n<a:Arrow:${arrowemoji}>┊\`${prefix}addmoney [@user#0001] [amount] [bank/wallet]\``
				)
				.setColor(`${infocolour}`);
			return botsend
				.send({
					embed: argembed
				})
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		} 
		if (!target) {
			let argembed = botembed
				.setDescription(
					`<a:Error:${erroremoji}>**┊Invalid user:**\n<a:Arrow:${arrowemoji}>┊\`${args[0]}\``
				)
				.setColor(`${warncolour}`);
			return botsend
				.send({
					embed: argembed
				})
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
		let wheretoPutMoney = args[2] || 'bank'; //or wallet
		let amount = parseInt(args[1]);
		if (!amount)
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Argument missing:**\n<a:Arrow:${arrowemoji}>┊\`Enter amount of money to add\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		let money = parseInt(amount);
		let result = await cs.addMoney({
			user: target,
			amount: money,
			wheretoPutMoney: wheretoPutMoney
		});
		if (result.error)
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Error negitive amount:**\n<a:Arrow:${arrowemoji}>┊\`You cant add negitive money\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		else {
			let successembed = botembed
				.setDescription(
					`<a:Success:${successemoji}>**┊Successfully added:**\n<a:Arrow:${arrowemoji}>┊<a:Money:${economyemoji}> \`${money} ${wheretoPutMoney} to \`${
						name
					} \`balance\``
				)
				.setColor(`${successcolour}`);
			botsend
				.send({
					embed: successembed
				})
				.then(m => {
					m.delete({ timeout: 25000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
	}
};
/**/
