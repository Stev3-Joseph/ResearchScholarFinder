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

const registerStu = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query(queries.registerStu, [email]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error running query", err);
    res.json({ error: err.message });
  }
};

const registerFac = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query(queries.registerFaculty, [email]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error running query", err);
    res.json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  const { email } = req.query;
  try {
    const result = await pool.query(queries.getProfile, [email]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error running query", err);
    res.json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  const {
    Name,
    School,
    FieldOfInterest,
    Experience,
    RelatedWork,
    CGPA,
    RegistrationNumber,
    Email,
  } = req.body;
  try {
    const result = await pool.query(queries.updateProfile, [
      Email,
      Name,
      School,
      FieldOfInterest,
      Experience,
      RelatedWork,
      CGPA,
      RegistrationNumber,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error running query", err);
    res.json({ error: err.message });
  }
};

module.exports = {
  getStudents,
  testConnection,
  registerStu,
  registerFac,
  getProfile,
  updateProfile,
};
