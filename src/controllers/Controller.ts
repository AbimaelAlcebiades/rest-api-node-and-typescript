import { Router } from "express";

export interface Controller {

  path: String;
  router: Router

  intializeRoutes(): void;

}