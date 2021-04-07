const SlashCommandExecutor = require('../slashcommand/slashcommandexecutor');
const SlashCommandEvent = require('../wrappers/slashcommandevent');

class TestAdmin extends SlashCommandExecutor {
    /** @param {SlashCommandEvent} event */
    onCommand(event) {
        this.send(event, {
            type: 4,
            data: {
                content: `Bot id: ${event.bot.user.id}`,
            },
        });
    }
}

module.exports = TestAdmin;
