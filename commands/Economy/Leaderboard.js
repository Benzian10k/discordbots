//---++++++main const++++++---
const Discord = require('discord.js');
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem();
//---++++++module export++++++---

module.exports = {
	name: 'leaderboard',
	admin: false,
	aliases: ['lb'],
	botowner: false,
	category: 'Economy',
	description: `show's global leaderboard.`,
	guildowner: false,
	hidden: false,
	mod: false,
	usage: 'leaderboard',
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
		usernickname,
		membernickname
	) => {
		let leaderboardembed = botembed;
		let data = await cs.globalLeaderboard();
		if (data.length < 1)
			return botsend.send(
				botembed.setDescription
					.setDescription(
						`<a:Error:${erroremoji}>┊Nobody's in Leaderboard yet!`
					)
					.setColor(`${warncolour}`)
			);
		let pos = 0;
		data.slice(0, 20).map(e => {
			pos++;
			if (!client.users.cache.get(e.userID)) return;
			leaderboardembed
				.setDescription(
					`**${
						client.user.username
					} Leaderboard:**\nHere you can see active members Leaderboard rank.\n\n**${pos}**┊**${
						client.users.cache.get(e.userID).username
					}**\n**Cash:** <a:Cash:${economyemoji}> \`${
						e.wallet
					}\`\n**Bank:** <a:Bank:${economyemoji}> \`${
						e.bank
					}\`\n**Total:** <a:Total:${economyemoji}> \`${e.wallet + e.bank}\``
				)
				.setColor(`${economycolour}`);
		});

		botsend
			.send(leaderboardembed)
			.then(m => {
				m.delete({ timeout: 120000 }).catch(err => {});
			})
			.catch(err => {});
	}
};
//---++++++file end++++++---
