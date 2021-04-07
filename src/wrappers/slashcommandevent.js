const Interaction = require('./interaction');
const Bot = require('../bot');

const SlashCommandEvent = {
    /** @type {Interaction} */
    interaction: undefined,
    /** @type {Bot} */
    bot: undefined,
};

module.exports = SlashCommandEvent;
