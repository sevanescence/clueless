const Bot = require('./bot');
// literally just load the bot source before anything else

const dotenv = require('dotenv');
const path = require('path');
const Ping = require('./commands/ping');

// initialize configuration
const env_config = dotenv.config({
    // set env filename to your env (probably .env)
    path: path.join(__dirname, '..', 'resources', 'dev.env'),
});

// If your .env is in the same directory
// as app.js and bot.js, you can simply
// not pass anything to the constructor,
// as long as you have dotenv installed
// on this project.
const bot = new Bot(env_config);
bot.login();
bot.once('ready', () => {
    const s = `${bot.user.username}#${bot.user.discriminator} is online!`;
    bot.logger.info(s);
    bot.commandhandler.initCommands();
    bot.commandhandler.commands.get('ping').executor = new Ping();
});

// TODO: add permissions to Command, exclude from form body.

// for today, just follow the data model
// provided by the discord slash commands
// documentation.
