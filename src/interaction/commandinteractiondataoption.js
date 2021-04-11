const CommandInteractionData = require('./commandinteractiondata');
const CommandOptionType = require('../command/commandoptiontype');

// ApplicationCommandInteractionDataOption according to the Discord API specifications.

// https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption
class CommandInteractionDataOption {
    /** the name of the parameter */
    name = '';
    /** the value of the pair */
    value = 1;
    /**
     * @type {CommandInteractionDataOption[]} present if this option
     * is group or subcommand
     */
    options = [];
    /**
     * @param {CommandInteractionDataOption} body
     * @return {CommandInteractionDataOption}
     */
    static parseFromFormBody(body) {
        const obj = new CommandInteractionDataOption();
        obj.name = body.name;
        obj.value = body.value;
        // checking the type is not required since a non-command wont pass options
        if (body.options) {
            for (let option of body.options) {
                obj.options.push(
                    CommandInteractionDataOption.parseFromFormBody(option)
                );
            }
        }
        return obj;
    }
}

module.exports = CommandInteractionDataOption;
