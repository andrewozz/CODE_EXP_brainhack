// entry point for server side application

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();  
const port = 3005;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//root route
app.get("/", (req, res) => {
  res.send("SERVER IS STARTING NOW..");
});


// // User Account routes
const userSettings = require("./routes/userSettingsRoutes");
app.use("/api/users", userSettings);



app.listen(port, () => {
  console.log(`server started on ${port}`);
});
