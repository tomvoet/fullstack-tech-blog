const pgPromise = require('pg-promise');

//const connStr = 'postgresql://postgres@localhost:5432/fullstack_tech_blog';

const connParameters = {
    host: 'localhost',
    port: 5432,
    database: 'fullstack_tech_blog',
    user: 'postgres',
    password: 'postgres'
}

const pgp = pgPromise({});
const psql = pgp(connParameters);

exports.psql = psql;