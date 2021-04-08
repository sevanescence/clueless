const CommandOptionType = require('./commandoptiontype');
const CommandOption = require('./commandoption');
const Command = require('./command');
const CommandEvent = require('../wrappers/slashcommandevent');

class CommandExecutor {
    onCommand(event) {}

    send(event, message) {
        event.bot.api
            .interactions(event.interaction.id, event.interaction.token)
            .callback.post({
                data: {
                    type: 4,
                    data: message,
                },
            });
    }
}

module.exports = CommandExecutor;
