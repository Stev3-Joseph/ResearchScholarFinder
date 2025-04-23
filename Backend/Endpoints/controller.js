const database = require("../supabase"); // or import if using ESModules

const getStudents = async (req, res) => {
  const { data, error } = await database.from("Student").select("*");
  if (error) return res.json({ error: error.message });
  res.json(data);
};

const testConnection = async (req, res) => {
  // Supabase has no SELECT NOW(), so use a test query
  const { data, error } = await database.from("Student").select("Email").limit(1);
  if (error) return res.json({ error: error.message });
  res.json({ message: "Connection successful", sample: data });
};

const registerStu = async (req, res) => {
  const { email } = req.body;
  const { data, error } = await database.from("Student").insert({ Email: email }).select();
  if (error) return res.json({ error: error.message });
  res.json(data);
};

const registerFac = async (req, res) => {
  const { email } = req.body;
  const { data, error } = await database.from("Faculty").insert({ Email: email }).select();
  if (error) return res.json({ error: error.message });
  res.json(data);
};

const getProfile = async (req, res) => {
  const { email } = req.query;
  const { data, error } = await database.from("Student").select("*").eq("Email", email).single();
  if (error) return res.json({ error: error.message });
  res.json(data);
};

const updateProfile = async (req, res) => {
  const {
    Name, School, FieldOfInterest, Experience, RelatedWork,
    CGPA, RegistrationNumber, Email
  } = req.body;

  const { data, error } = await database
    .from("Student")
    .update({ Name, School, FieldOfInterest, Experience, RelatedWork, CGPA, RegistrationNumber })
    .eq("Email", Email)
    .select()
    .single();

  if (error) return res.json({ error: error.message });
  res.json(data);
};

const getFacultyProfile = async (req, res) => {
  const { email } = req.query;
  const { data, error } = await database.from("Faculty").select("*").eq("Email", email).single();
  if (error) return res.json({ error: error.message });
  res.json(data);
};

const updateFacultyProfile = async (req, res) => {
  const { Name, School, Degree, AddEduQual, Email } = req.body;
  const { data, error } = await database
    .from("Faculty")
    .update({ Name, School, Degree, AddEduQual })
    .eq("Email", Email)
    .select()
    .single();

  if (error) return res.json({ error: error.message });
  res.json(data);
};

const addVacancy = async (req, res) => {
  const {
    FacultyName, FacultyEmail, ResearchTopic, RequiredSkills,
    Details, PaidResearch, MinCGPA
  } = req.body;

  const { data, error } = await database
    .from("Vacancy")
    .insert({ FacultyName, Email: FacultyEmail, ResearchTopic, RequiredSkills, Details, PaidResearch, MinCGPA })
    .select()
    .single();

  if (error) return res.json({ error: error.message });
  res.json(data);
};

const getVacancies = async (req, res) => {
  const { email } = req.query;
   const { data, error } = await database.from("Vacancy").select("*").eq("Email", email);
  if (error) return res.json({ error: error.message });
  res.json(data);
};

const getVacancyStudent = async (req, res) => {
  const { data, error } = await database.from("Vacancy").select("*");
  if (error) return res.json({ error: error.message });
  res.json(data);
};

module.exports = {
  getStudents,
  testConnection,
  registerStu,
  registerFac,
  getProfile,
  updateProfile,
  getFacultyProfile,
  updateFacultyProfile,
  addVacancy,
  getVacancies,
  getVacancyStudent,
};
