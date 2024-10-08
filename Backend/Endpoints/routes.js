const express = require("express");
const controller = require("./controller");
const app = express();

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/students", controller.getStudents);

app.get("/test-connection", controller.testConnection);

app.post("/registerStu", controller.registerStu);

app.post("/registerFac", controller.registerFac);

app.get("/getprofile", controller.getProfile);

app.put("/updateprofile", controller.updateProfile);

app.put("/updatefacultyprofile", controller.updateFacultyProfile);

app.get("/getfacultyprofile", controller.getFacultyProfile);

app.post("/addVacancy", controller.addVacancy);

app.get("/getVacancies", controller.getVacancies);

app.get("/showvacancystudent", controller.getVacancyStudent);



module.exports = app;
