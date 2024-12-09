const Client = require("../index").Client;
const {
	GatewayIntentBits,
	EmbedBuilder,
	ActivityType,
	PermissionBitField,
	ChannelType,
	ActionRowBuilder,
	SelectMenuBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	PermissionsBitField,
	ButtonBuilder,
	Events,
	ButtonStyle,
	SlashCommandBuilder,
} = require("discord.js");

Client.on("interactionCreate", async (inter) => {
	if (inter.isCommand()) {
		let slashCmds = Client.SlashCmds.get(inter.commandName);
		if (!inter.member.permissions.has([slashCmds.help.memberPermissions]))
			return;
		if (slashCmds) slashCmds.run(inter);
	}
});

Client.on(Events.InteractionCreate, async (interaction) => {
	if (interaction.isButton()) return;
	if (interaction.isChatInputCommand()) return;

	const modal = new ModalBuilder()
		.setTitle(`Gib uns mehr Informationen`)
		.setCustomId("modal");

	const email = new TextInputBuilder()
		.setCustomId("email")
		.setRequired(true)
		.setLabel("Provide us with your email")
		.setPlaceholder(" You must enter a valid email")
		.setStyle(TextInputStyle.Short);
	const username = new TextInputBuilder()
		.setCustomId("username")
		.setRequired(true)
		.setLabel("Provide us with your username")
		.setPlaceholder(" This is your username")
		.setStyle(TextInputStyle.Short);
	const reason = new TextInputBuilder()
		.setCustomId("reason")
		.setRequired(true)
		.setLabel("The reason for this ticket")
		.setPlaceholder(" Give us a reason for opening this ticket")
		.setStyle(TextInputStyle.Short);
	const firstActionRow = new ActionRowBuilder().addComponents(email);
	const secondActionRow = new ActionRowBuilder().addComponents(username);
	const thirdActionRow = new ActionRowBuilder().addComponents(reason);
	modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
	let choices;
	if (interaction.isSelectMenu()) {
		choices = interaction.values;
		const result = choices.join("");
	}
	if (!interaction.isModalSubmit()) {
		interaction.showModal(modal);
	}
	try {
		const modalResponse = await interaction.awaitModalSubmit({
			filter: (i) =>
				i.customId === "modal" && i.user.id === interaction.user.id,
			time: 60000,
		});
		if (modalResponse.isModalSubmit()) {
			const emailInput = interaction.fields.getTextInputValue("email");
			const usernameInput =
				interaction.fields.getTextInputValue("username");
			const reasonInput = interaction.fields.getTextInputValue("reason");
			const embed = new EmbedBuilder()
				.setColor("#ff9500")
				.setTitle(`${interaction.user.username}'s Ticket`)
				.setDescription(`Willkommen zu deinem Ticket`)
				.addFields({ name: `Email`, value: `${emailInput}` })
				.addFields({ name: `Username`, value: `${usernameInput}` })
				.addFields({ name: `Reason`, value: `${reasonInput}` })
				.setFooter({
					text: "S-Service",
					iconURL:
						"https://cdn.discordapp.com/attachments/1111651214241837109/1111651488436076604/S_Logo_3.png",
				});
			const button = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId("ticket")
					.setLabel(`Close Ticket`)
					.setStyle(ButtonStyle.Danger)
			);
			var cate;

			let channel = await interaction.guild.channels.create({
				name: `ticket-${interaction.user.username}`,
				type: ChannelType.GuildText,
				parent: `${cate}`,
			});
			channel.permissionOverwrites.set([
				{
					id: interaction.guild.id,
					deny: [PermissionsBitField.Flags.ViewChannel],
				},
			]);

			let msg = await channel.send({
				embeds: [embed],
				components: [button],
			});

			const collector = msg.createMessageComponentCollector();

			collector.on("collect", async (i) => {
				(await channel).delete();
				const dnembed = new EmbedBuilder()
					.setColor("#ff9500")
					.setTitle(`Your ticket has been Closed`)
					.setDescription(`Danke dir`)

					.setFooter({
						text: "S-Service",
						iconURL:
							"https://cdn.discordapp.com/attachments/1111651214241837109/1111651488436076604/S_Logo_3.png",
					})
					.setTimestamp();
				await interaction.member
					.send({ embeds: [dnembed] })
					.catch((err) => {
						return;
					});
			});
		}
	} catch (error) {
		console.log(error);
	}
});
