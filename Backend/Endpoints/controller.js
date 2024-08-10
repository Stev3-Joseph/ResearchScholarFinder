const pool = require("../db");
const queries = require("./queries");
const getStudents = async (req, res) => {
  try {
    const result = await pool.query(queries.getAllStudents);
    res.json(result.rows);
  } catch (err) {
    console.error("Error running query", err);
    res.json({ error: err.message });
  }
};

const testConnection = async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error("Error running query", err);
    res.json({ error: err.message });
  }
};

const register = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query(queries.registerUser, [email]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error running query", err);
    res.json({ error: err.message });
  }
};

module.exports = {
  getStudents,
  testConnection,
  register,
};
