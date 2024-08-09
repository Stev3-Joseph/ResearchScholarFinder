const express = require("express");
const controller = require("./controller");
const app = express();

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/students", controller.getStudents);

app.get("/test-connection", controller.testConnection);

module.exports = app;