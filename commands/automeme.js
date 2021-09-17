const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('automeme')
		.setDescription('auto sends memes')
        .addIntegerOption(option =>
            option.setName('int', 4)
                .setDescription('ammount of memes')
                .setRequired(true)),

	async execute(interaction, randomPuppy) {
        const id = interaction.options.get('target')?.value;
		var autouse = new Set();
        if (autouse.has(id)) {
            message.channel.send('u are already using the command')
            return;
        }
        
        const nom = interaction.options.getInteger('int')

        if (nom >= 51){
            await interaction.reply('enter a number between 1 and 50, 4 head');
            return;
        }
        autouse.add(id);
        await interaction.reply('Preparing the memes');
        var ams = 1;
        function myLoop() {
            setTimeout(function() {
                let reddit = [
                    "linuxmemes",
                    "Shitty_Car_Mods",
                    "meme",
                    "dankmemes",
                    "dankmeme",
                    "MemeEconomy",   
                    "meirl",
                    "me_irl",
                    "2meirl4meirl",
                ]
            
                let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
            
                
            
                
            try {
                randomPuppy(subreddit).then(async url => {
                    await interaction.followUp({
                            files: [{
                                attachment: url,
                                name: 'meme.png'
                            }]
                        })
                }).catch(err => console.error(err));
            } catch (error) {
                return;
            }
            ams++;                
                    if (ams <= nom) {           
                    myLoop();             
                    } else{
                        autouse.delete(id);
                        
                    }                       
                }, 4000)
        }
        
        myLoop();
        try {
            message.channel.stopTyping(true);
          } catch (error) {
            return;
          }
	},
};
