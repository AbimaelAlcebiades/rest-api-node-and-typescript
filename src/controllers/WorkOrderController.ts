import express, { Request, Response } from 'express';
import { WorkOrderService } from '../services/WorkOrderService';
import { WorkOrder } from "../services/WorkOrder";
import { Controller } from './Controller';

export class WorkOrderController implements Controller {

  public path = '/work-orders';
  public router = express.Router();
  public workOrderService: WorkOrderService = new WorkOrderService();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.getById)
    this.router.post(this.path, this.create);
    this.router.patch(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private getAll = (req: Request, res: Response) => {
    this.workOrderService.getAllWorkOrders().then((workOrders: Array<WorkOrder>) => {
      res.status(200).send(workOrders);
    }).catch((error) => {
      res.status(500).send(error);
    });
  }

  private getById = (req: Request, res: Response) => {

    const { id } = req.params;

    this.workOrderService.getWorkOrdersById(parseInt(id)).then((workOrder: WorkOrder) => {
      res.status(200).send(workOrder);
    }).catch((error: Error) => {
      if (error.name) {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
    });
  }

  private create = (req: Request, res: Response) => {
    const workOrder: WorkOrder = req.body;

    this.workOrderService.create(workOrder).then(result => {
      res.status(201).send(result);
    }).catch((error) => {

      if (Array.isArray(error)) {
        res.status(400).send(error);
      } else {
        res.status(500).send(`Unknow error ${error}`);
      }

    });
  }

  private update = (req: Request, res: Response) => {

    const { id } = req.params;

    this.workOrderService.update(parseInt(id), req.body).then(result => {
      res.status(200).send(result);
    }).catch((error) => {
      if (error.name) {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
    });
  }

  private delete = (req: Request, res: Response) => {

    const { id } = req.params;
    this.workOrderService.delete(parseInt(id)).then(result => {
      res.status(200).send(result);
    }).catch((error) => {
      if (error.name) {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
    });
  }

}
