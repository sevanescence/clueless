const SlashCommand = require('./slashcommand');
const Interaction = require('../wrappers/interaction');
const Bot = require('../bot');

const path = require('path');

const defaultCommandspath = path.join(
    __dirname,
    '..',
    '..',
    'resources',
    'commands.json'
);

class SlashCommandHandler {
    /**
     * @param {Bot} bot
     */
    constructor(bot) {
        this.bot = bot;
        /** @type {Map<string, SlashCommand>} */
        this.commands = new Map(); // TODO make private
    }
    /**
     *
     * @param {string} name name of command
     */
    getCommand(name) {
        return this.commands.get(name);
    }
    /**
     * Initialize command list.
     * @param {string} commandspath defaults to /resources/commands.json
     */
    initCommands(commandspath = defaultCommandspath) {
        this.bot.logger.info('Initializing command list...');
        const commandsConfig = require(commandspath);
        for (let commandName of Object.keys(commandsConfig)) {
            const slashCommand = new SlashCommand(commandsConfig[commandName]);
            this.commands.set(commandName, slashCommand);
            this.bot.api
                .applications(this.bot.user.id)
                .guilds(this.bot.config.guild_id)
                .commands.post({
                    data: {
                        name: commandName,
                        description: slashCommand.description,
                    },
                });
            this.bot.logger.info(`${commandName} initalized.`);
        }
        this.bot.ws.on('INTERACTION_CREATE', async (
            /** @type {Interaction} */ interaction
        ) => {
            const command = interaction.data.name.toLowerCase();
            const args = interaction.data.options;
            this.commands.get(command).executor.onCommand({
                bot: this.bot,
                interaction,
            });
        });
    }
}

module.exports = SlashCommandHandler;
