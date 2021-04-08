const CommandEvent = require('../wrappers/slashcommandevent');
const CommandExecutor = require('../command/commandexecutor');

class Ping extends CommandExecutor {
    /**
     * @param {CommandEvent} event
     */
    onCommand(event) {
        this.send(event, {
            content: 'Pong!',
        });
    }
}

module.exports = Ping;
