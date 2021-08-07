/*Invite*/
module.exports = {
	name: 'invite',
	category: 'Information',
	description: 'Get bot invite link!',
	usage: 'invite',
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
		let overviewembed = botembed.setColor(`${infocolour}`)
			.setDescription(`**『 Click the link below to invite me and also join our discord server!! 』
『 INVITE ME 』:**\n<a:Arrow:${arrowemoji}>┊[Click Here](${invite})\n**『 SERVER 』:**\n<a:Arrow:${arrowemoji}>┊[Click Here](${Botsupportserver})`);

		let mybuttonsmsg = await botsend
			.send({
				embed: overviewembed,
				buttons: buttonarray
			})
			.then(m => {
				m.delete({ timeout: 30000 }).catch(err => undefined);
			})
			.catch(err => {});
	}
};
/**/

/*
		var embedsarray = [overviewembed];
		for (let i = 0; i < 5; i++)
			embedsarray.push(botembed.setColor('RANDOM').setDescription(i));

		var currentPage = 0;

		const collector = mybuttonsmsg.createButtonCollector(
			button => button.clicker.user.id === message.author.id,
			{ time: 60e3 }
		);

		collector.on('collect', b => {
			b.defer();
			if (b.id == '3') {
				currentPage = 0;
				mybuttonsmsg.edit({
					embed: embedsarray[currentPage],
					buttons: buttonarray
				});
			} else if (b.id == '1') {
				if (currentPage !== 0) {
					--currentPage;
					mybuttonsmsg.edit({
						embed: embedsarray[currentPage],
						buttons: buttonarray
					});
				} else {
					currentPage = embedsarray.length - 1;
					mybuttonsmsg.edit({
						embed: embedsarray[currentPage],
						buttons: buttonarray
					});
				}
			} else if (b.id == '2') {
				if (currentPage < embedsarray.length - 1) {
					currentPage++;
					mybuttonsmsg.edit({
						embed: embedsarray[currentPage],
						buttons: buttonarray
					});
				} else {
					currentPage = 0;
					mybuttonsmsg.edit({
						embed: embedsarray[currentPage],
						buttons: buttonarray
					});
				}
			}
		});*/
