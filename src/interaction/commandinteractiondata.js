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
}

module.exports = CommandInteractionData;
