import winston from "winston";

it('should create new logger with transport console and file in desire level', () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: "info"
            }),
            new winston.transports.File({
                level: "error",
                filename: "application.log"
            })
        ]
    });

    logger.info("Hello world");
    logger.warn("Hello world");
    logger.error("Hello world");
});