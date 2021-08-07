/*Balance*/
module.exports = {
	name: 'balance',
	aliases: ['bal'],
	botowner: false,
	category: 'Economy',
	cooldown: 1000 * 10,
	description: 'Get your or user balance!',
	usage: 'balance',
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
		membernickname
	) => {
		const Discord = require('discord.js');
		const CurrencySystem = require('currency-system');
		const cs = new CurrencySystem();
		let target;
		let name;
		let cotarget = message.mentions.users.first();
		if (cotarget) {
			target = cotarget;
			name = usernickname;
		} else {
			target = message.author;
			name = membernickname;
		}
		let result = await cs.balance({
			user: target
		});
		const CashMoney = result.wallet;
		const BankMoney = result.bank;
		let Cmo = CashMoney;
		let Bmo = BankMoney;
		let Tmo = CashMoney + BankMoney;

		await botsend
			.send(
				botembed
					.setDescription(
						`**${name}'s Balance:**\n<a:Arrow:${arrowemoji}>┊You can use your balance in \`${
							client.user.username
						}\` shop!`
					)
					.addFields(
						{
							name: `Cash:`,
							value: `<a:Cash:${economyemoji}> ${Cmo}`
						},
						{
							name: `Bank:`,
							value: `<a:Bank:${economyemoji}> ${Bmo}`
						},
						{
							name: `Total:`,
							value: `<a:Total:${economyemoji}> ${Tmo}`
						}
					)
					.setColor(`${economycolour}`)
			)
			.catch(err => {});
	}
};
/**/
