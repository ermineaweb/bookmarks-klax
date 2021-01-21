import * as dotenv from "dotenv";
import express from "express";
import applyMiddlewares from "./middlewares";
import applyRouters from "./router";
import { InitService } from "./services";
import path from "path";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 80;

const app = express();

// just to have some mock data
(async () => {
  await InitService.init();
})();

applyMiddlewares(app);
applyRouters(app);

// we serve directly react via express, this is needed for react routing
if (NODE_ENV === "production") {
  app.use((req, res) => {
    res.sendFile(path.resolve("/app/client/build/index.html"));
  });
}

app.listen({ port: PORT }, () => {
  console.log(`server start on ${PORT} mode ${NODE_ENV}`);
});
