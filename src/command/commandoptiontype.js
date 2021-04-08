// ApplicationCommandOptionType according to the Discord API specifications.

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype */
const CommandOptionType = {
    /** 1 */
    SUB_COMMAND: 1,
    /** 2 */
    SUB_COMMAND_GROUP: 2,
    /** 3 */
    STRING: 3,
    /** 4 */
    INTEGER: 4,
    /** 5 */
    BOOLEAN: 5,
    /** 6 */
    USER: 6,
    /** 7 */
    CHANNEL: 7,
    /** 8 */
    ROLE: 8,
};

module.exports = CommandOptionType;
