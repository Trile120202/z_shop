import { Knex } from 'knex';

const config: Knex.Config = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'admin',
        password: 'dev_lor',
        database: 'ecommerce',
        port: 5432,
    },
    migrations: {
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    },
};

export default config;
