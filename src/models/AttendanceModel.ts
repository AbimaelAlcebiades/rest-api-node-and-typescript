import { Connection } from "../database/Connection";
import { Attendance } from "./Attendence";

export class AttendanceModel {

  async create(attendance: Attendance) {

    const connection = new Connection();

    const dataBase = connection.getConnection();

    const trx = await dataBase.transaction();

    try {

      const idsReturned = await trx('attendances').insert(attendance);

      const point_id = idsReturned[0];

      await trx.commit();

      return {
        id: point_id,
        ...attendance
      };

    } catch (error) {
      trx.rollback();
      return Promise.reject(error);
    }

  }
}