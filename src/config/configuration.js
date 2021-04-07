const dotenv = require('dotenv');

class EnvironmentConfiguration {
    constructor() {
        this.token = '';
        this.client_id = '';
        this.guild_id = '';
    }
    /**
     * Load environment configuration from an existing .env
     * @param {dotenv.DotenvConfigOutput} env_config
     * @return {EnvironmentConfiguration} loaded configuration
     */
    static loadFromENV(env_config) {
        const config = new EnvironmentConfiguration();
        config.token = env_config.parsed.TOKEN;
        config.client_id = env_config.parsed.CLIENT_ID;
        config.guild_id = env_config.parsed.GUILD_ID;
        return config;
    }
}

module.exports = EnvironmentConfiguration;
