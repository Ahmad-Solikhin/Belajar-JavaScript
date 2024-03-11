import {logger} from "../application/logging.js"

const home = async (req, res) => {
    logger.info("Accessing home controller");
    res.status(200).json({
        data: "Hello World"
    });
}

export default {
    home
}