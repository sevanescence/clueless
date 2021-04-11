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
    /**
     * @param {Interaction} body
     * @return {Interaction}
     */
    static parseFromFormBody(body) {
        const obj = new Interaction();
        obj.id = body.id;
        obj.application_id = body.application_id;
        obj.type = body.type;
        obj.data = CommandInteractionData.parseFromFormBody(body.data);
        obj.guild_id = body.guild_id;
        obj.channel_id = body.channel_id;
        obj.member = body.member;
        obj.user = body.user;
        obj.token = body.token;
        obj.version = body.version; // should always be 1...
        return obj;
    }
}

module.exports = Interaction;
