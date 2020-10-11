import moment from "moment";
import validate from "validate.js";
import { WorkOrderRepository } from "../repositories/WorkOrderRepository";
import { WorkOrder } from "./WorkOrder";

export class WorkOrderService {

  private workOrderRepository: WorkOrderRepository;

  constructor() {
    this.workOrderRepository = new WorkOrderRepository();
  }

  public async getAllWorkOrders() {
    const workOrders = await this.workOrderRepository.getAll();
    return workOrders.map(workOrder => this.formatDates(workOrder));
  }

  public async getWorkOrdersById(id: number) {
    const errors = validate({ id }, this.getGetByIdConstraints(), { format: "flat" });
    if (errors) {
      const error = new Error();
      error.name = "invalid_input";
      error.message = errors.join(', ');
      return Promise.reject(error);
    }
    const workOrder = await this.workOrderRepository.getById(id);
    return this.formatDates(workOrder);
  }

  public async create(workOrder: WorkOrder) {

    const errors = validate(workOrder, this.getCreateConstraints(), { format: "flat" });

    if (errors) {
      return Promise.reject(errors);
    }

    workOrder.created = moment().toDate();
    workOrder.serviceDate = moment(workOrder.serviceDate).toDate();

    return await this.workOrderRepository.create(workOrder);
  }

  private getStatus() {
    return ["DRAFT", "STARTED"];
  }

  private getCreateConstraints() {

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

  private getGetByIdConstraints() {
    return {
      id: {
        presence: false,
        type: "number"
      }
    };
  }

  public async update(id: number, workOrder: WorkOrder) {

    const errors = validate({ id }, this.getGetByIdConstraints(), { format: "flat" });
    if (errors) {
      const error = new Error();
      error.name = "invalid_input";
      error.message = errors.join(', ');
      return Promise.reject(error);
    }

    workOrder.id = id;
    return await this.workOrderRepository.update(workOrder);
  }

  async delete(id: number) {

    const errors = validate({ id }, this.getGetByIdConstraints(), { format: "flat" });
    if (errors) {
      const error = new Error();
      error.name = "invalid_input";
      error.message = errors.join(', ');
      return Promise.reject(error);
    }

    return await this.workOrderRepository.delete(id);
  }

  private formatDates(workOrder: WorkOrder) {
    const formated = { ...workOrder };
    formated.created = moment(workOrder.created).toDate();
    formated.serviceDate = moment(workOrder.serviceDate).toDate();
    return formated;
  }

}