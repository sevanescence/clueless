const InteractionType = require('./interactiontype');

const Discord = require('discord.js');

// Interaction according to the Discord API specifications.

// https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype
class Interaction {
    id = '';
    application_id = '';
    type = InteractionType.Ping;
    data = ''; // CommandInteractionData
    guild_id = '';
    channel_id = '';
    /** @type {Discord.GuildMember} */
    member = undefined;
    /** @type {Discord.User} */
    user = undefined;
}

module.exports = Interaction;
