const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const addData = require("./controllers/dataController.js");
const { createFile } = require("./excel/excel.js");
const {
  getAllTags,
  updateTag,
  updateRecentTag,
  getRecentTag,
} = require("./controllers/tagController");
const excelFileNames = ["Data.xlsx", "Context.xlsx", "Source.xlsx"];

app.use(express.static(path.join(__dirname, "..", "FRONTEND", "public")));
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    //change based on url "http://localhost:3001"
    origin: "https://aligned-solutions.netlify.app",
  })
);

//allows put request body to be accessed
app.use(bodyParser.json());

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

// app.post("/data/add", addData);
// app.get("/data/random", getRandomData);
app.use("/data", require("./routes/data"));

// app.get("/tag", getAllTags);
// app.put("/tag/update", updateTag);
// app.put("/tag/recent", updateRecentTag);
// app.get("/tag/recent", getRecentTag);
app.use("/tag", require("./routes/tag"));

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public", "/404.html"))
);

app.listen(3000, () => console.log("Server Listening on Port 3000"));
