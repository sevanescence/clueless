const dotenv = require('dotenv');

class EnvironmentConfiguration {
    constructor() {
        this.token = '';
    }
    /**
     * Load environment configuration from an existing .env
     * @param {dotenv.DotenvConfigOutput} env_config
     * @return {EnvironmentConfiguration} loaded configuration
     */
    static loadFromENV(env_config) {
        const config = new EnvironmentConfiguration();
        config.token = env_config.parsed.TOKEN;
        return config;
    }
}

module.exports = EnvironmentConfiguration;
