import express, { Request, Response } from 'express';
import { AttendanceService } from '../services/AttendanceService';
import { Attendance } from "../services/Attendence";
import { Controller } from './Controller';

export class AttendanceController implements Controller {

  public path = '/';
  public router = express.Router();
  public model: AttendanceService = new AttendanceService();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAttendance);
    this.router.post(this.path, this.createAttendance)
  }

  private getAttendance = (req: Request, res: Response) => {
    res.send("Atendimento");
  }

  private createAttendance = (req: Request, res: Response) => {
    const attendance: Attendance = req.body;

    this.model.create(attendance).then(result => {
      res.status(200).send(result);
    }).catch((error: Error) => {
      res.status(500).send(error.message);
    });
  }

}
