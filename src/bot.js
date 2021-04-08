const EnvironmentConfiguration = require('./config/configuration');
const CommandHandler = require('./command/commandhandler');
const ExitHandler = require('./exithandler');
const Logger = require('./logger');

const Discord = require('discord.js');
const dotenv = require('dotenv');
const path = require('path');

// this is done so data from the main script can be
// passed by reference to event handlers and such.
class Bot extends Discord.Client {
    /**
     * @param {dotenv.DotenvConfigOutput} env_config if no config is defined,
     *                                               defaults to ../resources/.env
     * @param {Discord.ClientOptions} options
     */
    constructor(
        env_config = dotenv.config({
            path: path.join(__dirname, '..', 'resources', '.env'),
        }),
        options
    ) {
        super(options);
        this.config = EnvironmentConfiguration.loadFromENV(env_config);
        this.commandhandler = new CommandHandler(this);
        // initialize logger and set log folder location
        this.logger = new Logger(path.join(__dirname, '..', 'logs'));
        // setup exit handler. callback will execute upon program death.
        this.exitHandler = new ExitHandler(() => {
            this.logger.info('Dumping logs to file...');
            this.logger.dumpLogs();
        });
        this.exitHandler.initialize();
        /** @type {string} path to resources folder */
        this.resources = path.join(__dirname, '..', 'resources');
    }
    /**
     * Login with token stored in local env
     */
    async login() {
        return super.login(this.config.token).catch((reason) => {
            this.logger.error('Your bot could not be logged in.');
            this.logger.error(reason);
            // use this to avoid having to set process.exitCode manually
            this.exitHandler.exit(1);
        });
    }
}

module.exports = Bot;
