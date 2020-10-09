import moment from "moment";
import { Database } from "../database/Connection";
import { AttendanceRepository } from "../repositories/AttendanceRepository";
import { Attendance } from "./Attendence";

export class AttendanceService {

  private repository: AttendanceRepository;

  constructor() {
    this.repository = new AttendanceRepository();
  }

  async create(attendance: Attendance) {

    const serviceDate = moment(attendance.serviceDate);

    if (!serviceDate.isValid()) {
      throw new Error(`Service date ${attendance.serviceDate} is invalid`);
    }

    attendance.created = new Date();

    attendance.serviceDate = new Date(attendance.serviceDate);

    return await this.repository.create(attendance);
  }
}