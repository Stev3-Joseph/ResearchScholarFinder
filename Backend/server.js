//connnecting to aws database
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;
const AppRoutes = require("./Endpoints/routes");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// favicon
app.use("/", AppRoutes);
