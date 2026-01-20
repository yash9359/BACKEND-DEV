const { Client, GatewayIntentBits } = require('discord.js');

// clint ko permission di app kya kar sakte ho 
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

//listener jab bhi message create ho to ye listener chale
client.on("messageCreate",(message)=>{
    
    // agar bot ne message kiya tabb
    if(message.author.bot){
        return;
    }

    if(message.content.startsWith("create")){
        const url = message.content.split("create")[1];
        return message.reply({
            content: "Generating Short ID for"+url,
        })
    }

    message.reply({
        content: "Hi From Bot"
    })
});

// /comand ke sath hoga too ye listener
client.on('interactionCreate',(interaction)=>{
    console.log(interaction);

    interaction.reply("pong bhai")
})



client.login("TOKEN");