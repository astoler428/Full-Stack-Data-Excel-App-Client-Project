const { v4: uuid } = require("uuid");
const { dataDB } = require("../db/databases.js");
const { exportToExcel, exportToDataExcelFile } = require("../excel/excel.js");

//controller that gets called when data is added
async function addData(req, res) {
  //get the data from the body

  let { link, date, data1, data2, data3, data4 } = req.body;

  //export certain data values into a row in these two excel files
  exportToExcel("./Source.xlsx", { link, date });
  exportToExcel("./Context.xlsx", { link, data1, data2, data3, data4 });

  let dataPoints = [data1, data2, data3, data4];
  let nonEmptyDataPoints = dataPoints.filter((dataPoint) => dataPoint !== "");

  //create datapoint for database with ID, datapoint and a list of tags

  let dataPointObjects = nonEmptyDataPoints.map((dataPoint) => {
    return { id: uuid(), dataPoint, tags: [] };
  });

  //write to database

  await dataDB.setData([...dataDB.data, ...dataPointObjects]);

  //excel file gets written over every time by writing the data database into it
  exportToDataExcelFile();
  res.json();
}

//controller that gets a random datapoint from the database based on a potential tag filter

function getRandomData(req, res) {
  let filteredDB;
  const tag = req.query.tag;

  //if empty tag, only use datapoints with no tags (tag array is empty)
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

  //select a random dataPoint

  let index = Math.floor(filteredDB.length * Math.random());
  let dataPoint = filteredDB[index];
  res.json(dataPoint);
}

module.exports = { addData, getRandomData };
