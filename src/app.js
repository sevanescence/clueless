const Bot = require('./bot');

const TestAdmin = require('./commands/testadmin');
const Test = require('./commands/test');

const dotenv = require('dotenv');
const path = require('path');

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
    bot.slashCommandHandler.initCommands();
    bot.slashCommandHandler.getCommand('test').setExecutor(new Test());
    bot.slashCommandHandler
        .getCommand('testadmin')
        .setExecutor(new TestAdmin());
});

// TODO: add sub command support
