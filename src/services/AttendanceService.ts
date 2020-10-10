import moment from "moment";
import validate from "validate.js";
import { AttendanceRepository } from "../repositories/AttendanceRepository";
import { Attendance } from "./Attendence";

export class AttendanceService {

  private repository: AttendanceRepository;

  constructor() {
    this.repository = new AttendanceRepository();
  }

  async create(attendance: Attendance) {

    const errors = this.getAttendanceErrors(attendance);

    if (errors) {
      throw new Error(errors.join(', '));
    }

    attendance.created = moment().toDate();
    attendance.serviceDate = moment(attendance.serviceDate).toDate();

    return await this.repository.create(attendance);
  }

  getAttendanceErrors(attendance: Attendance) {
    return validate(attendance, this.getConstraints(), { format: "flat" });
  }

  getStatus() {
    return ["DRAFT", "STARTED"];
  }

  getConstraints() {

    validate.extend(validate.validators.datetime, {
      parse: (value: string, options: any) => {
        return +moment.utc(value);
      },
      format: (value: string, options: any) => {
        const format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return moment.utc(value).format(format);
      }
    });

    const status = this.getStatus();

    return {
      customer: {
        presence: true,
        type: "string"
      },
      service: {
        presence: true,
        type: "string"
      },
      serviceDate: {
        presence: true,
        type: "string",
        datetime: {
          latest: moment.utc()
        }
      },
      status: {
        presence: true,
        type: "string",
        inclusion: {
          within: status,
          message: `"%{value}" is not allowed. Value allowed are ${status.join(', ')}`
        }
      }
    };
  }

}