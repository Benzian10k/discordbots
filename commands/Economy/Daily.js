/*daily*/
module.exports = {
	name: 'daily',
	category: 'Economy',
	cooldown: 1000 * 60 * 60 * 24 * 1,
	description: 'A way to earn money, daily!',
	usage: 'daily',
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
		const dailySchema = require('../../models/Economy/daily');
		const cs = new CurrencySystem();

		let dailydata = await dailySchema
			.findOne({ dailyid: `${botowner}` })
			.catch(err => {});
		let daily;
		if (!dailydata) {
			daily = 1500;
		} else {
			daily = dailydata.daily;
		}
		let result = await cs.daily({
			user: message.author,
			amount: daily
		});
		if (result.error)
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Daily recently claimed:**\n<a:Arrow:${arrowemoji}>┊\`Try again in ${
								result.time
							}\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => undefined);
				})
				.catch(err => {});
		else
			botsend
				.send(
					botembed

						.setDescription(
							`<a:Successfully:${successemoji}>**┊Successfully received:**\n<a:Arrow:${arrowemoji}>┊<a:Economy:${economyemoji}> \`${
								result.amount
							} daily cash\``
						)
						.setColor(`${economycolour}`)
				)
				.catch(err => {});
	}
};
/**/
