import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

it('should print logger with daily rotate file', () => {
    const logger = winston.createLogger({
        level: "silly",
        transports: [
            new winston.transports.Console({}),
            new DailyRotateFile({
                filename: "app-%DATE%.log",
                zippedArchive: true,
                maxSize: "1m",
                maxFiles: "14d"
            })
        ]
    });

    for (let i = 100001; i <= 200000; i++) {
        logger.info(`Hello ke-${i}`);
    }
});