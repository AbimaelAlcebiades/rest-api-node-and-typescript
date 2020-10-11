import Knex from "knex";

export async function seed(knex: Knex) {
  await knex('work_orders').insert([
    {
      customer: "Abimael",
      pet: "Frederico",
      service: "Wash",
      serviceDate: "2020-10-08T21:00:00.000-03:00",
      status: "DONE",
      notes: "Some notes about this service here",
      created: Date()
    },
    {
      customer: "Alcebíades",
      pet: "Garfield",
      service: "Anything",
      serviceDate: "2020-10-09T21:00:00.000-03:00",
      status: "DRAFT",
      notes: "Some notes about this service here",
      created: Date()
    }
  ]);
}