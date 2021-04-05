const fs = require('fs');
const path = require('path');

/** @type {Array<String>} */
const logCache = [];

/**
 * @param {number} n   number to pad
 * @return {string}    padded number
 */
const pad = (n) => (n > 9 ? n : `0${n}`);

/**
 * @returns {string} formatted date and time of day
 */
const now = (date) => {
    if (!date) {
        date = new Date();
    }
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `[${date.getFullYear()}/${month}/${day}, ${hours}:${minutes}:${seconds}]`;
};

/**
 * @param {Date} date
 */
const dateToFilename = (date) => {
    return (
        now(date)
            .replace(/(\[|\])/g, '')
            .replace(/(\/|,\s|:)/g, '-') + '.log'
    );
};

class Logger {
    /**
     * @param {string} logFolderPath path to log folder
     */
    constructor(logFolderPath) {
        /** @type {string[]} */
        this.logCache = [];
        this.logFolderPath = logFolderPath;
        if (!fs.existsSync(this.logFolderPath)) {
            fs.mkdirSync(this.logFolderPath);
        }
    }
    log(message) {
        console.log(message);
        this.logCache.push;
    }
    info(message) {
        console.info(message);
        this.logCache.push(`${now()} [INFO] ${message}`);
    }
    warn(message) {
        console.warn(message);
        this.logCache.push(`${now()} [WARN] ${message}`);
    }
    error(message) {
        console.error(message);
        this.logCache.push(`${now()} [ERROR] ${message}`);
    }
    /**
     * @param {fs.NoParamCallback} callback
     */
    dumpLogs(callback) {
        const filename = dateToFilename(new Date());
        const filepath = path.join(this.logFolderPath, filename);
        let content = '';
        while (this.logCache.length > 0) {
            content += this.logCache.shift() + '\n';
        }
        fs.writeFileSync(filepath, content, callback ? callback : () => {});
    }
}

module.exports = Logger;
