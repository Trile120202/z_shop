// import { Knex } from 'knex';
//
// const config: Knex.Config = {
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         user: 'admin',
//         password: 'dev_lor',
//         database: 'ecommerce',
//         port: 5432,
//     },
//     migrations: {
//         directory: './migrations',
//     },
//     seeds: {
//         directory: './seeds',
//     },
// };
//
// export default config;


import { Knex } from 'knex';

const config: Knex.Config = {
    client: 'pg',
    connection: {
        host: 'dpg-cs8a9k5svqrc73bmvr10-a.singapore-postgres.render.com',
        user: 'longdevlor',
        password: 'G8A9fEIpTop0Z6R5vtD3YeexijH8jC10',
        database: 'longdev',
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
