import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable(`work_orders`, table => {
        table.increments('id').primary();
        table.string('customer', 50).notNullable();
        table.string('pet', 20).nullable();
        table.string('service', 20).notNullable();
        table.dateTime('serviceDate').notNullable();
        table.string('status', 20).notNullable();
        table.text('notes').nullable();
        table.dateTime('created').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists(`work_orders`);
}