export interface WorkOrder {
  id: number;
  customer: string;
  pet: string;
  service: string;
  serviceDate: Date;
  status: string;
  notes: string;
  created: Date;
}