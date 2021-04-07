const SlashCommandEvent = require('../wrappers/slashcommandevent');

class SlashCommandExecutor {
    constructor() {}
    /**
     * @param {SlashCommandEvent} event
     */
    onCommand(event) {}
    /**
     * Send response to caller.
     * @param {SlashCommandEvent} event
     */
    send(event, data) {
        event.bot.api
            .interactions(event.interaction.id, event.interaction.token)
            .callback.post({
                data,
            });
    }
}

module.exports = SlashCommandExecutor;
