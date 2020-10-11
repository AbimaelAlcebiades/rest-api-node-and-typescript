import { Database } from "../database/Connection";
import { WorkOrder } from "../services/WorkOrder";

export class WorkOrderRepository {

  private database: Database;
  private table = 'work_orders';

  constructor() {
    this.database = new Database();
  }

  async getAll() {
    return await this.database.getConnection().select('*').from<WorkOrder>(this.table);
  }

  async getById(id: number) {
    const workOrder = await this.database.getConnection()
      .select('*')
      .where({
        id: id
      })
      .from<WorkOrder>(this.table);

    if (workOrder.length == 0) {
      const error = new Error();
      error.name = "not_found";
      error.message = `Work order with id ${id} not found`;
      return Promise.reject(error);
    }

    return workOrder[0];
  }

  async create(workOrder: WorkOrder) {

    const transaction = await this.database.getConnection().transaction();

    try {

      const idsReturned = await transaction(this.table).insert(workOrder);
      workOrder.id = idsReturned[0];
      await transaction.commit();

      return {
        workOrder
      };

    } catch (error) {
      transaction.rollback();
      return Promise.reject(error);
    }
  }

  async update(workOrder: WorkOrder) {

    const transaction = await this.database.getConnection().transaction();

    try {

      const updated = await transaction(this.table).where('id', workOrder.id).update(workOrder);
      await transaction.commit();

      if (updated) {
        return `Work order with id ${workOrder.id} was updated`;
      } else {
        const error = new Error();
        error.name = "not_found";
        error.message = `Work order with id ${workOrder.id} not found`;
        return Promise.reject(error);
      }

    } catch (error) {
      transaction.rollback();
      return Promise.reject(error);
    }
  }

  async delete(id: number) {

    const transaction = await this.database.getConnection().transaction();

    try {

      const deleted = await transaction(this.table).where('id', id).delete();
      await transaction.commit();

      if (deleted) {
        return `Work order with id ${id} was deleted`;
      } else {
        const error = new Error();
        error.name = "not_found";
        error.message = `Work order with id ${id} not found`;
        return Promise.reject(error);
      }
    } catch (error) {
      transaction.rollback();
      return Promise.reject(error);
    }
  }
}