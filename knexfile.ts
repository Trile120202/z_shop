import { Knex } from 'knex';

const config: Knex.Config = {
    client: 'pg',
    connection: {

    },
    migrations: {
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    },
};

export default config;