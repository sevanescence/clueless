const Interaction = require('../wrappers/interaction');
const Command = require('./command');
const Bot = require('../bot');

const path = require('path');

const defaultCommandsPath = path.join(
    __dirname,
    '..',
    '..',
    'resources',
    'commands.json'
);

class CommandHandler {
    /** @param {Bot} bot */
    constructor(bot) {
        this.bot = bot;
        /** @type {Map<string, Command>} */
        this.commands = new Map();
    }
    /**
     * ONLY call initCommands after the bot is ready.
     *
     * @param {string} commandsPath - custom commands path. defaults to
     * /resources/commands.json
     */
    initCommands(commandsPath = defaultCommandsPath) {
        const commands = require(commandsPath);
        for (let commandObj of Object.values(commands)) {
            // TODO set command IDs to assigned IDs after they are deployed.
            const command = new Command(commandObj, this.bot.user.id);
            this.commands.set(command.name, command);
            this.bot.api
                .applications(this.bot.user.id)
                .guilds(this.bot.config.guild_id)
                .commands.post({
                    data: command.parseToFormBody(),
                });
        }

        this.bot.ws.on('INTERACTION_CREATE', async (
            /** @type {Interaction} */ interaction
        ) => {
            const commandName = interaction.data.name.toLowerCase();
            this.commands.get(commandName).executor.onCommand({
                bot: this.bot,
                interaction,
            });
        });
    }
}

module.exports = CommandHandler;
