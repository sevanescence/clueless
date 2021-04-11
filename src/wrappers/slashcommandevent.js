const Interaction = require('../interaction/interaction');
const Bot = require('../bot');

class CommandEvent {
    /**
     * @param {Bot} bot
     * @param {Interaction} interaction
     */
    constructor(bot, interaction) {
        this.bot = bot;
        this.interaction = interaction;
    }
}

module.exports = CommandEvent;
