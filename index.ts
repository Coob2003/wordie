const config = require("./config.json")
const wordlist = require("./wordList.json")
const finishedGames = require("./games.json")

import { Client, CommandInteraction, Intents, Interaction, Message, MessageActionRow, MessageButton, Options } from "discord.js"

const client = new Client({
    partials: [
        "MESSAGE",
        "CHANNEL",
        "GUILD_MEMBER",
        "REACTION",
        "USER"
    ],
    intents: [
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

let games: Map<String, Array<Message>> = new Map<String, Array<Message>>()

async function generateGrid(src: Array<Message>) {
    let grid: Array<MessageActionRow> = new Array<MessageActionRow>()
    return grid
}

async function handleHelp(interaction: CommandInteraction) {
    await interaction.reply(`
- help => this command
- ping => pong
- play => start a new game
        `)
}

async function handlePing(interaction: CommandInteraction) {
    await interaction.reply(`Pong!`)
}

async function handlePlay(interaction: CommandInteraction) {
    if (games.get(`${interaction.user.id}${interaction.channel!.id}`) != null) {
        interaction.reply(`Please finish your current game first`)
    } else {
        let data = {
            content: ""
        }
        data.content = wordlist[Math.floor(Math.random() * wordlist.length)]
        console.log(data)
        const grid: Array<MessageActionRow> = await generateGrid(games.get(`${interaction.user.id}${interaction.channel!.id}`)!)
        interaction.reply({ content: "Guess the word!", components: grid })
    }
}

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return
    console.log("c")
    if (interaction.channel === null) return
    console.log("d")

    const { commandName } = interaction

    switch (commandName) {
        case "help":
            handleHelp(interaction)
            break
        case "ping":
            handlePing(interaction)
            break
        case "play":
            handlePlay(interaction)
            break
    }
})

client.on("ready", () => {
    console.log(`ready`)
})

client.login(config.discordToken)