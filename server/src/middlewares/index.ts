import express, { Application } from "express";
import cors from "cors";
import * as path from "path";

const DOCKER = process.env.DOCKER;

// register futures middlewares here

function applyMiddlewares(app: Application) {
  // to parse body parameters
  app.use(express.json());
  // when in dev, it's boring when cors are unauthorized
  if (process.env.NODE_ENV === "development") app.use(cors());
  // serve our static files
  app.use(express.static(path.resolve(DOCKER === "true" ? "/app/client/build" : "../client/build")));
}

export default applyMiddlewares;
