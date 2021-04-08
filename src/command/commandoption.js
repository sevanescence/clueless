const CommandOptionType = require('./commandoptiontype');

// ApplicationCommandOption according to the Discord API specifications.

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption */
class CommandOption {
    /** value of CommandOptionType */
    type = CommandOptionType.SUB_COMMAND;
    /** 1-32 character name matching ^[\w-]{1,32}$ */
    name = '';
    /** 1-100 character description */
    description = '';
    /** if the parameter is required or optional--default false */
    required = true;
    /**
     * @type {(string | number)[]}
     * choices for string and int types for the user to pick from */
    choices = [];
    /**
     * @type {CommandOption[]} if the option is
     * a subcommand or subcommand group type,
     * this nested options will be the parameters
     */
    options = [];
    /** @param {CommandOption} option */
    constructor(option) {
        this.type = option.type || 0;
        this.name = option.name || '';
        this.description = option.description || '';
        this.required = option.required || false;
        if (option.choices) {
            this.choices = [];
            for (let choice of option.choices) {
                this.choices.push(choice);
            }
        }
        if (option.options) {
            this.options = [];
            for (let ioption of option.options) {
                this.options.push(new CommandOption(ioption));
            }
        }
    }
    /** @return {string} */
    parseToFormBody() {
        const obj = new CommandOption(this);
        if (obj.choices.length === 0) {
            delete obj.choices;
        }
        if (obj.options.length === 0) {
            delete obj.options;
        }
        if (
            obj.type === CommandOptionType.SUB_COMMAND ||
            obj.type === CommandOptionType.SUB_COMMAND_GROUP
        ) {
            delete obj.required;
        }
        return JSON.parse(JSON.stringify(obj));
    }
}

module.exports = CommandOption;
