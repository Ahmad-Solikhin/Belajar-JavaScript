import {prismaClient} from "../application/database.js";
import {logger} from "../application/logging.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.get("X-API-TOKEN");
    logger.info(`Token is ${token}`);
    if (!token) {
        res.status(401).json({
            error: "Unauthorized"
        }).end();
    } else {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            },
            select: {
                username: true
            }
        });
        if (!user) {
            res.status(401).json({
                error: "Unauthorized"
            }).end();
        } else {
            req.user = user;
            next();
        }
    }
}