const path = require("path");
const { v4: uuid } = require("uuid");
const { dataDB } = require("../db/databases.js");
const { exportToExcel, exportToDataExcelFile } = require("../excel/excel.js");

async function addData(req, res) {
  let { link, date, data1, data2, data3, data4 } = req.body;
  exportToExcel("./Source.xlsx", { link, date });
  exportToExcel("./Context.xlsx", { link, data1, data2, data3, data4 });
  let dataPoints = [data1, data2, data3, data4];
  let nonEmptyDataPoints = dataPoints.filter((dataPoint) => dataPoint !== "");
  let dataPointObjects = nonEmptyDataPoints.map((dataPoint) => {
    return { id: uuid(), dataPoint, tags: [] };
  });

  await dataDB.setData([...dataDB.data, ...dataPointObjects]);

  exportToDataExcelFile();
  res.json();
  // res.redirect("http://127.0.0.1:5501/views/add.html");
}

function getRandomData(req, res) {
  //find something from DB
  let filteredDB;
  //if empty tag
  const tag = req.query.tag;
  if (tag === "") {
    filteredDB = dataDB.data.filter((dataEntry) => dataEntry.tags.length === 0);
  } else if (tag === "RANDOM DATA") {
    filteredDB = dataDB.data;
  } else
    filteredDB = dataDB.data.filter((dataEntry) =>
      dataEntry.tags.includes(req.query.tag)
    );

  if (filteredDB.length === 0) {
    res.status(404).json({ message: "No datapoint found with that tag" });
    return;
  }

  let index = Math.floor(filteredDB.length * Math.random());
  let dataPoint = filteredDB[index];
  res.json(dataPoint);
}

module.exports = { addData, getRandomData };
