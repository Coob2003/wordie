const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('help').setDescription('Shows a list of all commands'),
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong'),
	new SlashCommandBuilder().setName('play').setDescription('Starts a new game'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(config.discordToken);

rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);