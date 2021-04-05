class ExitHandler {
    /** @param {Function<void>} handlerCallback - handler to run when program exits */
    constructor(handlerCallback) {
        this.handlerCallback = handlerCallback;
        this.closing = false; // avoid exit callback overlap
    }
    /** @param {Function<void>} handlerCallback - handler to run when program exits */
    setHandlerCallback(handlerCallback) {
        this.handlerCallback = handlerCallback;
    }
    /**
     * Assigns ExitHandler callback to process events.
     */
    initialize() {
        const secureCallback = () => {
            if (!this.closing) {
                this.handlerCallback();
                this.closing = true;
            }
        };
        // default exit
        process.on('exit', secureCallback);
        // catch CTRL+C
        process.on('SIGINT', () => {
            secureCallback();
            process.exit();
        });
        // kill pid
        process.on('SIGUSR1', secureCallback);
        process.on('SIGUSR2', secureCallback);
        // uncaught exceptions
        process.on('uncaughtException', secureCallback);
    }
    /**
     * Exit program and preserve exit code.
     *
     * This is primarly to preserve the exit code
     * state when catching CTRL+C (SIGINT event).
     * @param {number} exitCode - process exit code
     */
    exit(exitCode) {
        process.exitCode = exitCode;
        process.exit();
    }
}

module.exports = ExitHandler;
