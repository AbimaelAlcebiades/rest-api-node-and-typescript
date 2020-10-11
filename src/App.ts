import express, { Application } from "express";
import * as bodyParser from 'body-parser';
import { Controller } from "./controllers/Controller";

export class App {

  app: Application;
  port: number;
  version = "v1";

  constructor(controllers: Array<Controller>, port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  private initializeControllers(controllers: Array<Controller>) {
    controllers.forEach((controller) => {
      this.app.use(`/${this.version}/`, controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

}