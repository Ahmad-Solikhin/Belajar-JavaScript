import winston from "winston";

it('should create new logger with simple format', () => {
    const logger = winston.createLogger({
        level: "info",
        // format: winston.format.simple(),
        // format: winston.format.logstash(),
        format: winston.format.printf(info => {
            return `${new Date()} | ${info.level.toUpperCase()} | ${info.message}`;
        }),
        transports: [
            new winston.transports.Console({})
        ]
    });

    logger.log({
        level: "info",
        message: "Hello Logger"
    });
});