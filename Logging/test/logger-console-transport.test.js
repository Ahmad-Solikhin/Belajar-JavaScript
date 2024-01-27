import winston from "winston";

it('should create new logger with transport console', () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({})
        ]
    });

    logger.log({
        level: "info",
        message: "Hello Logger"
    });
});