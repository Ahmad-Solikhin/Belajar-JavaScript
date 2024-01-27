import winston from "winston";

it('should create new logger with transport console and file', () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({}),
            new winston.transports.File({
                filename: "application.log"
            })
        ]
    });

    logger.info("Hello world");
    logger.warn("Hello world");
    logger.error("Hello world");
});