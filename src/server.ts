import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routerHandler } from "./routes/route";
import config from "./config";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routerHandler(req, res);
  },
);

server.listen(config.port, () => {
  console.log(`Server is running on Port ${config.port}`);
});
