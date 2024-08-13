const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "researchfinder",
  password: "postgres",
  port: 5432,
 
});

module.exports = pool;
