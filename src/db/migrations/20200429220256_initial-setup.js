exports.up = knex => {
    return knex.schema
        .createTable('users', table => {
            table.increments('user_id').primary();
            table.string('email', 254).unique().notNullable();
            table.string('first_name', 50).notNullable();
            table.string('last_name', 50).notNullable();
            table.string('password', 100).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('demos', table => {
            table.increments('demo_id').primary();
            table.string('demo_name', 50).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.integer('user_id').references('user_id').inTable('users').notNullable();
        });
};

exports.down = knex => {
    return knex.schema.dropTable('demos').dropTable('users');
};
