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
}

module.exports = CommandInteractionDataOption;
