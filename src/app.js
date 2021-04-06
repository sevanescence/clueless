const Bot = require('./bot');

const dotenv = require('dotenv');
const path = require('path');

// initialize configuration
const env_config = dotenv.config({
    // set env filename to your env (probably .env)
    path: path.join(__dirname, 'config', 'dev.env'),
});

const bot = new Bot(env_config);
bot.login();
bot.once('ready', () => {
    const s = `${bot.user.username}#${bot.user.discriminator} is online!`;
    bot.logger.info(s);
    bot.slashCommandHandler.initCommands();
});
