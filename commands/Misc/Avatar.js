/*Avatar*/
module.exports = {
	name: 'avatar',
	aliases: ['pfp', 'profileicon'],
	category: 'Misc',
	description: 'Get user and own avatar!',
	usage: 'avatar [@user#0001]',
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
		infoemoji,
		CommandName
	) => {
		const axios = require('axios');
		const Discord = require('discord.js');
		const { MessageButton } = require('discord-buttons');

		let target;
		const user = message.mentions.members.first();
		let firstbutton = new MessageButton().setStyle('url');
		if (user) {
			target = user.id;
			firstbutton.setLabel(`${usernickname}`);
		} else {
			target = message.author.id;
			firstbutton.setLabel(`${membernickname}`);
		}

		axios
			.get(`https://discord.com/api/users/${target}`, {
				headers: {
					Authorization: `Bot ${client.token}`
				}
			})
			.then(user => {
				const { avatar } = user.data;
				const avaURL = `https://cdn.discordapp.com/avatars/${target}/${avatar}.webp?size=4096`;
				firstbutton.setURL(`${avaURL}`);
				let avatarembed = botembed
					.setColor(`${infocolour}`)
					.setImage(`${avaURL}`);
				if (avatar) {
					return botsend
						.send({
							embed: avatarembed,
							buttons: firstbutton
						})
						.then(m => {
							m.delete({ timeout: 60000 }).catch(err => undefined);
						})
						.catch(err => {});
				} else {
					const usrURL = `${useravatar}?size=4096`;
					firstbutton.setURL(`${usrURL}`);
					let lastembed = botembed
						.setColor(`${infocolour}`)
						.setImage(`${usrURL}`);
					return botsend
						.send({
							embed: lastembed,
							buttons: firstbutton
						})
						.then(m => {
							m.delete({ timeout: 60000 }).catch(err => undefined);
						})
						.catch(err => {});
				}
			});
	}
};
/**/
