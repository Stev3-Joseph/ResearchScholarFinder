//connnecting to aws database
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

const Pool = require("pg").Pool;

const pool = new Pool({
  host: "database-1.cqjxjzqzjz9z.us-east-1.rds.amazonaws.com",
  user: "admin",
  database: "postgres",
  password: "password",
  port: 5432,
});

// favicon

app.get("/favicon.ico", (req, res) => res.status(204));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
