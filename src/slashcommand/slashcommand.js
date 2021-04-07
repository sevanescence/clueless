const SlashCommandEvent = require('../wrappers/slashcommandevent');
const SlashCommandExecutor = require('./slashcommandexecutor');

const Discord = require('discord.js');

const commandOptions = {
    description: '',
    permissions: '',
};

class SlashCommand {
    /**
     * @param {commandOptions} options
     */
    constructor(options) {
        this.description = options.description;
        this.permissions = (() => {
            let tmpPerms = options.permissions
                .toUpperCase()
                .replace(/(\w+?|_+?)(?=\s|$)/g, 'Discord.Permissions.FLAGS.$1');
            return eval(tmpPerms);
        })();
        this.executor = new SlashCommandExecutor();
    }
    /**
     * Set executor of command.
     * @param {SlashCommandExecutor} event
     */
    setExecutor(executor) {
        this.executor = executor;
    }
}

module.exports = SlashCommand;
