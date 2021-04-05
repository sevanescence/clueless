const EnvironmentConfiguration = require('./config/configuration');
const ExitHandler = require('./exithandler');
const Logger = require('./logger');

const Discord = require('discord.js');
const dotenv = require('dotenv');
const path = require('path');

// initialize configuration
const env_config = dotenv.config({
    // set env filename to your env (probably .env)
    path: path.join(__dirname, 'config', 'dev.env'),
});
const config = EnvironmentConfiguration.loadFromENV(env_config);

// initialize logger and set log folder location
const logger = new Logger(path.join(__dirname, '..', 'logs'));

// setup exit handler. callback will execute upon program death.
const exitHandler = new ExitHandler(() => {
    logger.dumpLogs(); // write log file for current process
});
exitHandler.initialize();

// initialize discord client
const client = new Discord.Client();

client.login(config.token).catch((reason) => {
    logger.error('Your bot could not be logged in.');
    logger.error(reason);
    // use this to avoid having to set process.exitCode manually
    exitHandler.exit(1);
});

client.once('ready', () => {
    let s = `${client.user.username}#${client.user.discriminator} is online!`;
    logger.info(s);
});
