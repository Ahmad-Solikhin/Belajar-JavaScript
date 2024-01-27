import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.File({
            handleExceptions: true,
            filename: "../exception.json",
            format: winston.format.json()
        })
    ]
});

hello();