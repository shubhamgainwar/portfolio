const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/portfolioRoute");
const path = require("path");

const app = express();
dotenv.config();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors()); // Use this after the variable declaration

app.use(express.json()); // tell the server to accept the json data from frontend

app.use(express.static(path.join(__dirname, "./client/build")));

//Signup and login
app.use("/api/v1/portfolio", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.get("*");
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
