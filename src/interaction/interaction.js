const InteractionType = require('./interactiontype');

const Discord = require('discord.js');
const CommandInteractionData = require('./commandinteractiondata');

// Interaction according to the Discord API specifications.

// https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype
class Interaction {
    /** id of the interaction */
    id = '';
    /** id of the application this interaction is for */
    application_id = '';
    /** type of the interaction */
    type = InteractionType.Ping;
    /**
     * @type {CommandInteractionData} the command data payload
     */
    data = undefined; // CommandInteractionData
    /** the guild it was sent from */
    guild_id = '';
    /** the channel it was sent from */
    channel_id = '';
    /** @type {Discord.GuildMember} */
    member = undefined;
    /** @type {Discord.User} */
    user = undefined;
    /** a continuation token for responding to the interaction */
    token = '';
    /** read-only property, always 1 */
    version = 1;
}

module.exports = Interaction;
