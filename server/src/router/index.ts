import { Application } from "express";
import bookmarkRouter from "./bookmark";

// register futures router API here

function applyRouter(app: Application) {
  app.use("/bookmarks", bookmarkRouter);
}

export default applyRouter;
