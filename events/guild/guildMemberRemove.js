/*member leave*/
module.exports = async (client, member) => {
	const canvas = require('discord-canvas');
	const { MessageAttachment, MessageEmbed, Message } = require('discord.js');
	const {
		Defaultleavemessage,
		Defaultwelcomeimage
	} = require('../../config/Bot.json');
	const leaveSchema = require('../../models/Channels/leave');
	const leavewelmesSchema = require(`../../models/Guild/leavewelmes`);
	const welcomeimageSchema = require(`../../models/Guild/welcomeimage`);
	const welcomecolourSchema = require(`../../models/Guild/welcomecolour`);
	const errorSchema = require('../../models/Channels/error');
	const { Errorchannel } = require('../../config/Channel.json');
	const { Botowner } = require('../../config/Bot.json');
	const { Wrongemoji } = require('../../config/Emoji.json');
	const { Errorcolour } = require('../../config/Color.json');

	let errorcolour = Errorcolour;
	let wrongemoji = Wrongemoji;
	let errorchannel;
	let errorchannelData = await errorSchema.findOne({
		errorid: `${Botowner}`
	});
	if (!errorchannelData) {
		errorchannel = client.channels.cache.get(`${Errorchannel}`);
	} else {
		errorchannel = client.channels.cache.get(`${errorchannelData.error}`);
	}

	let channelTosend;
	let leaveChannel = await leaveSchema.findOne({
		leaveid: member.guild.id
	});
	if (leaveChannel) {
		channelTosend = member.guild.channels.cache.get(`${leaveChannel.leave}`);
	}
	if (channelTosend) {
		let leavemessage;
		let leaveMsg = await leavewelmesSchema.findOne({
			leavewelmesid: member.guild.id
		});
		if (!leaveMsg) {
			leavemessage = `${Defaultleavemessage}`;
		} else {
			leavemessage = leaveMsg.leavewelmes;
		}

		let welcomecolour;
		let welcomecolourdata = await welcomecolourSchema.findOne({
			welcomecolourid: member.guild.id
		});
		if (welcomecolourdata) {
			welcomecolour = welcomecolourdata.welcomecolour;
		} else {
			welcomecolour = `#54FFE3`;
		}

		let welcomeimage;
		let welcomeimagedata = await welcomeimageSchema.findOne({
			welcomeimageid: member.guild.id
		});
		if (welcomeimagedata) {
			welcomeimage = welcomeimagedata.welcomeimage;
		} else {
			welcomeimage = `${Defaultwelcomeimage}`;
		}

		let content = leavemessage
			.replace(/{server:name}/g, `${member.guild.name}`)
			.replace(/{server:owner:id}/g, `${member.guild.ownerID}`)
			.replace(/{server:members}/g, `${member.guild.memberCount}`)
			.replace(/{server:id}/g, `${member.guild.id}`)
			.replace(
				/{server:iconurl}/g,
				`${member.guild.iconURL({ dynamic: true, size: 4096 })}`
			)
			.replace(
				/{server:voice:channels}/g,
				`${member.guild.channels.cache.filter(c => c.type === 'voice').size}`
			)
			.replace(
				/{server:text:channels}/g,
				`${member.guild.channels.cache.filter(c => c.type === 'text').size}`
			)
			.replace(
				/{server:all:channels}/g,
				`${member.guild.channels.cache.filter(c => c.type !== 'category').size}`
			)
			.replace(
				/{server:categories}/g,
				`${member.guild.channels.cache.filter(c => c.type === 'category').size}`
			)
			.replace(/{server:roles}/g, `${member.guild.roles.cache.size}`)
			.replace(
				/{server:normal:emojis}/g,
				`${member.guild.emojis.cache.filter(e => !e.animated).size}`
			)
			.replace(
				/{server:animated:emojis}/g,
				`${member.guild.emojis.cache.filter(e => e.animated).size}`
			)
			.replace(/{server:all:emojis}/g, `${member.guild.emojis.cache.size}`)
			.replace(/{server:created}/g, `${member.guild.createdAt}`)
			.replace(/{member:mention}/g, `<@${member.user.id}>`)
			.replace(/{member:discriminator}/g, `${member.user.discriminator}`)
			.replace(/{member:name}/g, `${member.user.username}`)
			.replace(
				/{member:nitro:subscription}/g,
				`${member.premiumSubscriptionCount ? 'Yes' : 'No'}`
			)
			.replace(/{member:id}/g, `${member.user.id}`)
			.replace(/{member:tag}/g, `${member.user.tag}`)
			.replace(
				/{member:avatarurl}/g,
				`${member.user.displayAvatarURL({ dynamic: true, size: 4096 })}`
			)
			.replace(/{member:account:created}/g, `${member.user.createdAt}`)
			.replace(/{member:joined}/g, `${member.user.joinedAt}`);

		let tom = member.guild.member(client.user);
		let botnickname = tom ? tom.displayName : client.user.username;

		const roleColor =
			member.guild.me.displayHexColor === '#000000'
				? '#ffffff'
				: member.guild.me.displayHexColor;
		let image = await new canvas.Goodbye()
			.setUsername(`${member.user.username}`)
			.setDiscriminator(`${member.user.discriminator}`)
			.setMemberCount(`${member.guild.memberCount}`)
			.setGuildName(`${member.guild.name}`)
			.setAvatar(member.user.displayAvatarURL({ format: `png` }))
			.setColor('border', `${roleColor}`)
			.setColor('username-box', `${welcomecolour}`)
			.setColor('discriminator-box', `${welcomecolour}`)
			.setColor('message-box', `${welcomecolour}`)
			.setColor('title', `${welcomecolour}`)
			.setColor('avatar', `${welcomecolour}`)
			.setBackground(`${welcomeimage}`)
			.toAttachment();
		let leaveimage = new MessageAttachment(
			(await image).toBuffer(),
			'Goodbye-image.png'
		);

		channelTosend
			.send({
				embed: {
					author: {
						name: `${member.guild.name}`,
						icon_url: `${member.guild.iconURL({ dynamic: true, size: 4096 })}`
					},
					description: `${content}`,
					color: `E5B123`,
					image: {
						url: `${leaveimage}`
					},
					timestamp: new Date(),
					footer: {
						text: `${botnickname}`,
						icon_url: `${client.user.displayAvatarURL({
							dynamic: true,
							size: 4096
						})}`
					}
				}
			})
			.catch(err => {
				if (errorchannel) {
					errorchannel
						.send({
							embed: {
								color: `${errorcolour}`,
								author: {
									name: `Event: guildMemberRemove`,
									icon_url: `${member.guild.iconURL({
										dynamic: true,
										size: 4096
									})}`
								},
								description: `<a:Wrong:${wrongemoji}>┊${err}`,
								timestamp: new Date(),
								footer: {
									text: `${client.user.username}`,
									icon_url: `${client.user.displayAvatarURL({
										dynamic: true,
										size: 4096
									})}`
								}
							}
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					console.log(err);
				}
			});
	}
};
/**/
