import winston from "winston";

it('should create new logger', () => {
    const logger = winston.createLogger({});

    logger.log({
        level: "info",
        message: "Hello Logger"
    });
});