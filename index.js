// Require the necessary discord.js classes
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const randomPuppy = require('random-puppy');
const automeme = require('./commands/automeme');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Command handling
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		console.log(interaction.commandName);
		switch(String(interaction.commandName)){
			case 'automeme':
				var require = randomPuppy;
				break;
			case 'ping':
				var require = '';
				break;
		}
		await command.execute(interaction, require);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token);
