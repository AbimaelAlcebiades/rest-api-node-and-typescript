import { App } from "./App";
import { WorkOrderController } from "./controllers/WorkOrderController";
import { Controller } from "./controllers/Controller";

const controllers: Array<Controller> = new Array<Controller>();
controllers.push(new WorkOrderController());

const app = new App(controllers, 3000);
app.listen();
