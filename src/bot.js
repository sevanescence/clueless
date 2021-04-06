const EnvironmentConfiguration = require('./config/configuration');
const SlashCommandHandler = require('./slashcommandhandler');
const SlashCommand = require('./slashcommand');
const ExitHandler = require('./exithandler');
const Logger = require('./logger');

const interactions = require('discord-slash-commands-client');
const Discord = require('discord.js');
const dotenv = require('dotenv');
const path = require('path');

// this is done so data from the main script can be
// passed by reference to event handlers and such.
class Bot extends Discord.Client {
    /**
     * @param {dotenv.DotenvConfigOutput} env_config if no config is defined,
     *                                               defaults to ./.env
     * @param {Discord.ClientOptions} options
     */
    constructor(env_config = dotenv.config(), options) {
        super(options);
        this.config = EnvironmentConfiguration.loadFromENV(env_config);
        this.slashCommandHandler = new SlashCommandHandler(this);
        // initialize logger and set log folder location
        this.logger = new Logger(path.join(__dirname, '..', 'logs'));
        // setup exit handler. callback will execute upon program death.
        this.exitHandler = new ExitHandler(() => {
            this.logger.dumpLogs();
        });
        this.exitHandler.initialize();
        this.interactions = new interactions.Client(
            this.config.token,
            '775177410458681345'
        );
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
