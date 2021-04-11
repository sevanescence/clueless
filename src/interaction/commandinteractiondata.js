const CommandInteractionDataOption = require('./commandinteractiondataoption');

// ApplicationCommandInteractionData according to the Discord API specifications.

// https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata
class CommandInteractionData {
    /** the ID of the invoked command */
    id = '';
    /** the name of the invoked command */
    name = '';
    /**
     * @type {CommandInteractionDataOption[]} the params +
     * the values from the user
     */
    options = [];
    /**
     * @param {CommandInteractionData} body
     * @return {CommandInteractionData}
     */
    static parseFromFormBody(body) {
        const obj = new CommandInteractionData();
        obj.id = body.id;
        obj.name = body.name;
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

module.exports = CommandInteractionData;
