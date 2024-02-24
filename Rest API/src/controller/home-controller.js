import {log} from "../application/logging.js"

const home = async (req, res) => {
    log.info("Accessing home controller");
    res.status(200).json({
        data: "Hello World"
    });
}

export default {
    home
}