import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.File({
            handleRejections: true,
            handleExceptions: true,
            filename: "../rejection.json",
            format: winston.format.json()
        })
    ]
});

const callAsync = async () => {
    return Promise.reject("Ups");
}

callAsync();