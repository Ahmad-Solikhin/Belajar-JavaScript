import {web} from "./application/web.js";
import {log} from "./application/logging.js"

web.listen(3000, () => {
    log.info("App start in port 3000");
})