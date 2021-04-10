// InteractionType according to the Discord API specifications.

// https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype
class InteractionType {
    /** 1 */
    static Ping = 1;
    /** 2 */
    static ApplicationCommand = 2;
}

module.exports = InteractionType;
