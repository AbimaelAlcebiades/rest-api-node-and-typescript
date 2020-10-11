import Knex from "knex";

export async function seed(knex: Knex) {
  await knex('work_orders').insert([
    {
      customer: "Abimael",
      pet: "Frederico",
      service: "Wash",
      status: "DONE",
      notes: "Some notes about this service here"
    }
  ]);
}