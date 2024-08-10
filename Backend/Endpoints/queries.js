const getAllStudents = 'SELECT * FROM "Student"';

const registerUser = 'INSERT INTO "Student" ("Email") VALUES ($1) RETURNING *';

module.exports = {
  getAllStudents,
  registerUser,
};
