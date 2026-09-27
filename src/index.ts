import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = async () => {
    app.listen(config.port, () => {
        initDB()
        console.log(`sever running on the port ${config.port}`);
    })
}

main();