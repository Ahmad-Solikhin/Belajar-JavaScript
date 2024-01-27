import winston from "winston";

it('should print logger all level', () => {
    const logger = winston.createLogger({
        level: "silly",
        transports: [
            new winston.transports.Console({})
        ]
    });

    logger.log({level: "error", message: "This is error"});
    logger.log({level: "warn", message: "This is warn"});
    logger.log({level: "info", message: "This is info"});
    logger.log({level: "http", message: "This is http"});
    logger.log({level: "verbose", message: "This is verbose"});
    logger.log({level: "debug", message: "This is debug"});
    logger.log({level: "silly", message: "This is silly"});
});

it('should print logger all level with shortcut function', () => {
    const logger = winston.createLogger({
        level: "silly",
        transports: [
            new winston.transports.Console({})
        ]
    });

    logger.error("This is error");
    logger.warn("This is warn");
    logger.info("This is info");
    logger.http("This is http");
    logger.verbose("This is verbose");
    logger.debug("This is debug");
    logger.silly("This is silly");
});