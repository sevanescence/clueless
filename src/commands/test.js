const SlashCommandExecutor = require('../slashcommand/slashcommandexecutor');
const SlashCommandEvent = require('../wrappers/slashcommandevent');

class Test extends SlashCommandExecutor {
    /**
     * @param {SlashCommandEvent} event
     */
    onCommand(event) {
        this.send(event, {
            type: 4,
            data: {
                content: 'Check this out:',
                embeds: [
                    {
                        title: 'lol!',
                    },
                ],
            },
        });
    }
}

module.exports = Test;
