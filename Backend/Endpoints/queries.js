const getAllStudents = 'SELECT * FROM "Student"';

const registerStu = 'INSERT INTO "Student" ("Email") VALUES ($1) RETURNING *';

const registerFaculty =
  'INSERT INTO "Faculty" ("Email") VALUES ($1) RETURNING *';

const getProfile = 'SELECT * FROM "Student" WHERE "Email" = $1';

const updateProfile =
  'UPDATE "Student" SET "Name" = $2, "School" = $3, "FieldOfInterest" = $4, "Experience" = $5, "RelatedWork" = $6,"CGPA"=$7, "RegistrationNumber"=$8 WHERE "Email" = $1 RETURNING *';

const getFacultyProfile = 'SELECT * FROM "Faculty" WHERE "Email" = $1';

const updateFacultyProfile =
  'UPDATE "Faculty" SET "Name" = $2, "School" = $3, "Degree" = $4, "AddEduQual" = $5 WHERE "Email" = $1 RETURNING *';

const addVacancy =
  'INSERT INTO "Vacancy" ("FacultyName", "Email", "ResearchTopic", "RequiredSkills", "Details", "PaidResearch", "MinCGPA") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

const getVacancies = 'SELECT * FROM "Vacancy" WHERE "Email" = $1';

module.exports = {
  getAllStudents,
  registerStu,
  getProfile,
  updateProfile,
  registerFaculty,
  getFacultyProfile,
  updateFacultyProfile,
  addVacancy,
  getVacancies,
};
