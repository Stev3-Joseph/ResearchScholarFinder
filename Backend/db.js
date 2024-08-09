const Pool = require("pg").Pool;

const pool = new Pool({
  host: "database-1.cvq0gwqqiijv.us-east-1.rds.amazonaws.com",
  user: "postgres",
  database: "ResearchDB",
  password: "123postgress",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // This ignores SSL certificate verification, useful for testing
  },
});

module.exports = pool;
