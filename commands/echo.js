const { SlashCommandBuilder } = require('discord.js');

/*
add_____Option
    String
    Boolean
    Integer - only accepts whole numbers.
    Number - accepts both whole numbers and decimals.
    User,
    Channel,
    Role,
    Mentionable - will show a selection list in the Discord interface for their associated type, or will accept a Snowflake (id) as input.
    Attachment - options prompt the user to make an upload along with the slash command.
    Subcommand,
    SubcommandGroup - allow you to have branching pathways of subsequent options for your commands - more on that later on this page.
*/


module.exports = {
	data : new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')
				.setRequired(true))
	// setMaxLength() setMinLength(), setMaxValue()  setMinValue()
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to echo into'))
	// addChannelTypes()  e.g. ChannelType.GuildText.
		.addBooleanOption(option =>
			option.setName('ephemeral')
				.setDescription('Whether or not the echo should be ephemeral')),
	async execute(interaction) {
		console.log('interaction', interaction);
	},
};