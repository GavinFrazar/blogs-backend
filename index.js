const http = require("http");
const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

const { PORT } = config;
const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Listening on PORT ${PORT}`);
});
