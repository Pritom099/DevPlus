import app from "./app";
import config from "./config";

const main = async () => {
    app.listen(config.port, () => {
        console.log(`sever running on the port ${config.port}`);
    })
}

main();