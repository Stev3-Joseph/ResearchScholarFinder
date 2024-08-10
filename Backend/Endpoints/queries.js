const getAllStudents = 'SELECT * FROM "Student"';

const registerUser = 'INSERT INTO "Student" ("Email") VALUES ($1) RETURNING *';

const getProfile = 'SELECT * FROM "Student" WHERE "Email" = $1';

const updateProfile =
  'UPDATE "Student" SET "Name" = $2, "School" = $3, "FieldOfInterest" = $4, "Experience" = $5, "RelatedWork" = $6,"CGPA"=$7, "RegistrationNumber"=$8 WHERE "Email" = $1 RETURNING *';

module.exports = {
  getAllStudents,
  registerUser,
  getProfile,
  updateProfile,
};
