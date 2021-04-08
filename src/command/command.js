const CommandExecutor = require('./commandexecutor');
const CommandOption = require('./commandoption');

// ApplicationCommand according to the Discord API specifications (as well as an executor).

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommand */
class Command {
    /** Snowflake ID of the command */
    id = '0';
    /** Snowflake ID of parent application */
    application_id = '0';
    /** 1-32 character name matching ^[\w-]{1,32}$ */
    name = '';
    /** 1-100 character description */
    description = '';
    /** @type {CommandOption[]} The parameters for the command */
    options = [];
    /**
     * @param {Command} command
     * @param {string} client_id - ID of your bot/application
     */
    constructor(command, client_id) {
        if (!client_id) {
            console.error('Client ID was not passed to Command constructor.');
            process.exit(1);
        }
        this.id = command.id || '';
        this.application_id = client_id;
        this.name = command.name || '';
        this.description = command.description || '';
        if (command.options) {
            this.options = []; // just in case :worrywoz:
            for (let option of command.options) {
                this.options.push(new CommandOption(option));
            }
        }
        this.executor = new CommandExecutor();
    }
    /** @return {string} */
    parseToFormBody() {
        const obj = new Command(this, this.application_id);
        delete obj.executor;
        delete obj.id;
        delete obj.application_id;
        if (obj.options.length === 0) {
            delete obj.options;
        } else {
            for (let i = 0; i < obj.options.length; i++) {
                obj.options[i] = obj.options[i].parseToFormBody();
            }
        }
        return JSON.parse(JSON.stringify(obj));
    }
}

module.exports = Command;
