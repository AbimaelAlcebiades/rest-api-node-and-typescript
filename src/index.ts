import { App } from "./App";
import { AttendanceController } from "./controllers/Attendance";
import { Controller } from "./controllers/Controller";

const controllers: Array<Controller> = new Array<Controller>();
controllers.push(new AttendanceController());

const app = new App(controllers, 3000);
app.listen();
