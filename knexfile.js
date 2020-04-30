require('dotenv').config({ path: './src/config/config.env' });

const migrationsDirectory = './src/db/migrations';

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING,
        migrations: {
            directory: migrationsDirectory
        }
    },

    staging: {
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING,
        migrations: {
            directory: migrationsDirectory
        }
    },

    production: {
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING,
        migrations: {
            directory: migrationsDirectory
        }
    }
};
