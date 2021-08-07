/*Help*/
module.exports = {
	name: 'help',
	aliases: ['h'],
	category: 'Information',
	description: `Returns all commands, or one specific command info!`,
	usage: 'help [command]',
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
		const { readdirSync } = require('fs');
		const { Infinityemoji, Partneremoji } = require('../../config/Emoji.json');
		const Discord = require('discord.js');
		const CurrencySystem = require('currency-system');
		const cs = new CurrencySystem();
		const { Botscope, Botsupportserver } = require('../../config/Bot.json');
		const { MessageButton } = require('discord-buttons');
		const ms = require('ms');
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
		/*
		const roleColor =
			message.guild.me.displayHexColor === '#000000'
				? '#ffffff'
				: message.guild.me.displayHexColor;
		*/
		if (!args[0]) {
			let categories = [];
			let list = [];
			const emocat = {
				Admin: `<a:Admin:${adminemoji}>┊`,
				Economy: `<a:Economy:${economyemoji}>┊`,
				Emoji: `<a:Emoji:${emojilistemoji}>┊`,
				Global: `<a:Global:${globalemoji}>┊`,
				Misc: `<a:Misc:${miscemoji}>┊`,
				Mod: `<a:Mod:${modemoji}>┊`,
				Information: `<a:Info:${infoemoji}>┊`,
				Settings: `<a:Settings:${settingsemoji}>┊`
			};
			const hidcat = ['Botowner'];
			readdirSync('./commands/').forEach(dir => {
				if (hidcat.includes(dir)) return;
				const commands = readdirSync(`./commands/${dir}/`).filter(file =>
					file.endsWith('.js')
				);
				const ename = `${emocat[dir]} ${dir.toUpperCase()}`;
				const cmds = commands.map(command => {
					let file = require(`../../commands/${dir}/${command}`);
					if (!file.name) return '`onworking...`';

					let name = file.name.replace('.js', '');

					return `\`${name}\``;
				});

				let data = new Object();
				data = {
					name: ename,
					value: cmds.length === 0 ? 'In progress.....' : cmds.join(`, `)
				};

				categories.push(data);
			});
			let argnotembed = botembed
				.addFields(categories)
				.setDescription(
					`<a:Arrow:${arrowemoji}>┊use \`${prefix}help\` followed by a command name to get more additional information on a command, For example: \`${prefix}help prefix\`!`
				)
				.setColor(`${infocolour}`);
			botsend
				.send({
					embed: argnotembed,
					buttons: buttonarray
				})
				.then(m => {
					m.delete({ timeout: 50000 }).catch(err => undefined);
				})
				.catch(err => {});
		} else {
			const command =
				client.commands.get(args[0].toLowerCase()) ||
				client.commands.find(
					c => c.aliases && c.aliases.includes(args[0].toLowerCase())
				);

			if (!command) {
				return botsend
					.send(
						botembed
							.setDescription(`<a:Wrong:${wrongemoji}>┊Invalid command!`)
							.setColor(`${errorcolour}`)
					)
					.then(m => {
						m.delete({ timeout: 15000 }).catch(err => undefined);
					})
					.catch(err => {});
			}

			let lastembed = botembed
				.addField(
					`${membernickname}'s prefix:`,
					`<a:Arrow:${arrowemoji}>┊${prefix}`
				)
				.addField(
					`Usage:`,
					command.usage
						? `<a:Arrow:${arrowemoji}>┊${prefix}${command.usage}`
						: `<a:Arrow:${arrowemoji}>┊${prefix}${command.name}`
				)

				.setColor(`${infocolour}`);
			if (command.description) {
				if (command.description.length) {
					lastembed.addField(
						`Description:`,
						`<a:Arrow:${arrowemoji}>┊${command.description}`
					);
				}
			}
			if (command.name) {
				if (command.name.length) {
					lastembed.addField(
						`Name:`,
						`<a:Arrow:${arrowemoji}>┊${command.name}`
					);
				}
			}
			if (command.aliases) {
				if (command.aliases.length) {
					lastembed.addField(
						`Aliases:`,
						`<a:Arrow:${arrowemoji}>┊${command.aliases}`
					);
				}
			}
			const times = getDuraction(command.cooldown);
			if (command.cooldown) {
				lastembed.addField(`Cooldown:`, `<a:Arrow:${arrowemoji}>┊${times}`);
			}
			let permlevel = `Public`;
			if (command.botowner) {
				permlevel = `Botowner`;
			}
			if (command.guildowner) {
				permlevel = `Serverowner`;
			}
			if (command.admin) {
				permlevel = `Admin`;
			}
			if (command.mod) {
				permlevel = `Mod`;
			}
			lastembed.addField(
				`Command Permission Level:`,
				`<a:Arrow:${arrowemoji}>┊${permlevel}`
			);
			if (command.BotChannelPermission) {
				if (command.BotChannelPermission.length) {
					lastembed.addField(
						'Bot Channel Permission:',
						`<a:Arrow:${arrowemoji}>┊${command.BotChannelPermission.map(
							value =>
								`${value[0].toUpperCase() +
									value
										.toLowerCase()
										.slice(1)
										.replace(/_/g, ' ')}`
						).join(', ')}`
					);
				}
			}
			if (command.UserChannelPermission) {
				if (command.UserChannelPermission.length) {
					lastembed.addField(
						'User Channel Permission:',
						`<a:Arrow:${arrowemoji}>┊${command.UserChannelPermission.map(
							value =>
								`${value[0].toUpperCase() +
									value
										.toLowerCase()
										.slice(1)
										.replace(/_/g, ' ')}`
						).join(', ')}`
					);
				}
			}
			if (command.BotRolePermission) {
				if (command.BotRolePermission.length) {
					lastembed.addField(
						'Bot Role Permission:',
						`<a:Arrow:${arrowemoji}>┊${command.BotRolePermission.map(
							value =>
								`${value[0].toUpperCase() +
									value
										.toLowerCase()
										.slice(1)
										.replace(/_/g, ' ')}`
						).join(', ')}`
					);
				}
			}
			if (command.UserRolePermission) {
				if (command.UserRolePermission.length) {
					lastembed.addField(
						'User Role Permission:',
						`<a:Arrow:${arrowemoji}>┊${command.UserRolePermissio.map(
							value =>
								`${value[0].toUpperCase() +
									value
										.toLowerCase()
										.slice(1)
										.replace(/_/g, ' ')}`
						).join(', ')}`
					);
				}
			}
			botsend
				.send({
					embed: lastembed,
					buttons: buttonarray
				})
				.then(m => {
					m.delete({ timeout: 30000 }).catch(err => undefined);
				})
				.catch(err => {});
		}
	}
};

/*time function*/
function getDuraction(ms) {
	if (ms === 0) {
		return false;
	}
	let date = new Date(ms);
	let seconds = date.getUTCSeconds() ? date.getUTCSeconds() + ' Seconds' : '';
	let minutes = date.getUTCMinutes() ? date.getUTCMinutes() + ' Minutes, ' : '';
	let hours = date.getUTCHours() ? date.getUTCHours() + ' Hours, ' : '';
	let days = date.getUTCDate() - 1 ? date.getUTCDate() - 1 + ' Days, ' : '';
	let time = seconds + minutes + hours + days;
	if (time === '') {
		return false;
	}
	return time;
}
/**/
