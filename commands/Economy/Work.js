/*work*/
module.exports = {
	name: 'work',
	admin: false,
	botowner: false,
	category: 'Economy',
	cooldown: 1000 * 60 * 4,
	description: 'A way to earn money, work!',
	guildowner: false,
	hidden: false,
	mod: false,
	usage: 'work',
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
		const workSchema = require('../../models/Economy/work');

		let random = Math.floor(Math.random() * 13) + 1;
		let workdata = await workSchema
			.findOne({ workid: `${botowner}` })
			.catch(err => {});
		let workmin;
		let workmax;
		if (!workdata) {
			workmin = 50;
			workmax = 150;
		} else {
			workmin = workdata.workmin;
			workmax = workdata.workmax;
		}
		let result = await cs.beg({
			user: message.author,
			minAmount: workmin,
			maxAmount: workmax
		});
		let workdescription;
		if (random === 1) {
			workdescription = `Your job as a 🏋️ ️trainer is very interesting and earns you <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 2) {
			workdescription = `You actually finished the plate of 🥗 that your parents made you eat! You were awarded <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 3) {
			workdescription = `You develop 🎰 and earn <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 4) {
			workdescription = `You work as a 🐧 logist and earn <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 5) {
			workdescription = `You work as a 👂 cleaner and earn <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 6) {
			workdescription = `You work as a personal 🏪 and earn <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 7) {
			workdescription = `You work as a 🐕 surfing instructor and earn <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 8) {
			workdescription = `You work as a 🐝 feater and earn <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 9) {
			workdescription = `You work as a 🤡 and earn <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 10) {
			workdescription = `You work as the head of 🐘 and earn <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 11) {
			workdescription = `You work as an elementary school 👨‍🏫 and earn <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 12) {
			workdescription = `You worked as a 🎤 actor for Spongebob and managed to gain <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 13) {
			workdescription = `You had a 🍊 day at the office today and earned <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (random === 14) {
			workdescription = `You work as 👶 birth educator and earn <a:Cash:${economyemoji}> ${
				result.amount
			} cash`;
		}
		if (result.error)
			return botsend
				.send(
					botembed
						.setDescription(
							`<a:Error:${erroremoji}>**┊Worked recently:**\n<a:Arrow:${arrowemoji}>┊\`Try again in ${
								result.time
							}\``
						)
						.setColor(`${warncolour}`)
				)
				.then(m => {
					m.delete({ timeout: 10000 }).catch(err => {});
				})
				.catch(err => {});
		else
			botsend
				.send(
					botembed
						.addField(
							`<a:Successfully:${successemoji}>┊Successfully received:`,
							`<a:Arrow:${arrowemoji}>┊${workdescription}`
						)
						.setColor(`${economycolour}`)
				)
				.catch(err => {});
	}
};
/**/
