const SlashCommand = require('./slashcommand');
const Bot = require('./bot');

const Discord = require('discord.js');

class SlashCommandHandler {
    /**
     * @param {Bot} bot
     */
    constructor(bot) {
        this.bot = bot;
        /** @type {Map<String, SlashCommand>} */
        this.commands = new Map();
    }
    /**
     * @param {string} name
     * @param {SlashCommand} slashcommand
     */
    addCommand(name, slashcommand) {
        this.commands.set(name, slashcommand);
    }
    /**
     * Initialize slash command websockets.
     * Only call after RPC connection is
     * established.
     */
    initCommands() {
        if (this.bot.readyAt === null) {
            this.bot.logger.error('Bot connection has not been established.');
            this.bot.exitHandler.exit(1);
        }
        this.bot.api
            .applications(this.bot.user.id)
            .guilds('682095178773037176')
            .commands.post({
                data: {
                    name: 'test',
                    description: 'this is a test',
                },
            });
        this.bot.ws.on('INTERACTION_CREATE', async (interaction) => {
            const command = interaction.data.name.toLowerCase();
            const args = interaction.data.options;
            if (command === 'test') {
                this.bot.api
                    .interactions(interaction.id, interaction.token)
                    .callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: 'LOL!',
                            },
                        },
                    });
            }
        });
    }
}

module.exports = SlashCommandHandler;
