import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable(`attendances`, table => {
        table.increments('id').primary();
        table.string('customer', 50).notNullable();
        table.string('pet', 20).nullable();
        table.string('service', 20).notNullable();
        table.string('status', 20).notNullable();
        table.text('notes').nullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists(`points`);
}