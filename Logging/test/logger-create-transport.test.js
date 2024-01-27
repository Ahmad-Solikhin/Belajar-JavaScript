import TransportStream from "winston-transport";
import winston from "winston";

it('should create custom transport', () => {

    class MyTransport extends TransportStream {

        constructor(options) {
            super(options);
        }

        log(info, next) {
            console.log(`Send error tp email with message : ${info.message}`);
            next();
        }

    }

    const logger = winston.createLogger({
        level: "info",
        transports: [
            new winston.transports.Console({}),
            new MyTransport({
                level: "error"
            })
        ]
    });

    logger.warn("Warn hello world");
    logger.error("Error hello world");

});