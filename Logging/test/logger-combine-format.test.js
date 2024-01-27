import winston from "winston";

it('should create new logger with combine format', () => {
    const logger = winston.createLogger({
        level: "info",
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.simple()
        ),
        transports: [
            new winston.transports.Console({})
        ]
    });

    logger.info({
        message: "Hello Logger"
    });
    logger.warn({
        message: "Hello Logger"
    });
});