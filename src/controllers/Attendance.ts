import express, { Request, Response } from 'express';
import { request } from 'http';
import { AttendanceModel } from '../models/AttendanceModel';
import { Attendance } from "../models/Attendence";
import { Controller } from './Controller';

export class AttendanceController implements Controller {

  public path = '/';
  public router = express.Router();
  public model: AttendanceModel = new AttendanceModel();

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
    })
  }

}
