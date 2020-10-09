import { Database } from "../database/Connection";
import { Attendance } from "../services/Attendence";

export class AttendanceRepository {

  private database: Database;

  constructor() {
    this.database = new Database();
  }

  async create(attendance: Attendance) {

    const transaction = await this.database.getConnection().transaction();

    try {

      const idsReturned = await transaction('attendances').insert(attendance);
      const id = idsReturned[0];
      await transaction.commit();

      return {
        id,
        ...attendance
      };

    } catch (error) {
      transaction.rollback();
      return Promise.reject(error);
    }
  }
}