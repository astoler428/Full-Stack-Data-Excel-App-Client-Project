const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const { createFile } = require("./excel/excel.js");

const excelFileNames = ["Data.xlsx", "Context.xlsx", "Source.xlsx"];

//built in middleware

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); //allows put request body to be accessed

//change to the url that front end runs on
app.use(
  cors({
    // origin: "http://localhost:3001",
    origin: "https://aligned-solutions.netlify.app",
  })
);

//GET request that creates the three excel files the client requested
app.get("/excel/create", (req, res) => {
  try {
    excelFileNames.forEach((fileName) => {
      if (!fs.existsSync(fileName)) createFile(fileName);
    });
    res.send({});
  } catch (err) {
    console.error(err);
  }
});

//custom middleware

app.use("/data", require("./routes/data"));
app.use("/tag", require("./routes/tag"));

//catch all else not found page

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public", "/404.html"))
);

app.listen(3000, () => console.log("Server Listening on Port 3000"));
