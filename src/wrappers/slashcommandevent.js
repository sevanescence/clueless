const Interaction = require('./interaction');
const Bot = require('../bot');

const CommandEvent = {
    /** @type {Interaction} */
    interaction: undefined,
    /** @type {Bot} */
    bot: undefined,
};

module.exports = CommandEvent;
