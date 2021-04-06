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

// this is done so data from the main script can be
// passed by reference to event handlers and such.
class Bot extends Discord.Client {
    /**
     * @param {dotenv.DotenvConfigOutput} env_config
     * @param {Discord.ClientOptions} options
     */
    constructor(env_config = dotenv.config(), options) {
        super(options);
        this.config = EnvironmentConfiguration.loadFromENV(env_config);
        // initialize logger and set log folder location
        this.logger = new Logger(path.join(__dirname, '..', 'logs'));
        // setup exit handler. callback will execute upon program death.
        this.exitHandler = new ExitHandler(() => {
            this.logger.dumpLogs();
        });
        this.exitHandler.initialize();
    }
    async login() {
        return super.login(this.config.token).catch((reason) => {
            this.logger.error('Your bot could not be logged in.');
            this.logger.error(reason);
            // use this to avoid having to set process.exitCode manually
            this.exitHandler.exit(1);
        });
    }
}

const bot = new Bot(env_config);
bot.login().then(() => {
    const s = `${bot.user.username}#${bot.user.discriminator} is online!`;
    bot.logger.info(s);
});
