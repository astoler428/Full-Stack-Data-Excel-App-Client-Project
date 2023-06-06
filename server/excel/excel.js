const xlsx = require("xlsx");
const { dataDB, tagsDB, recentTagDB } = require("../db/databases.js");

function exportToExcel(fileName, data) {
  let file = xlsx.readFile(fileName);
  xlsx.utils.sheet_add_json(file.Sheets.Sheet1, [data], {
    origin: -1,
    skipHeader: 1,
  });
  xlsx.writeFile(file, fileName);
}

async function createFile(fileName) {
  //if creating data file, reset data.json

  if (fileName === "Data.xlsx") {
    await dataDB.setData([]);
    await tagsDB.setTags([]);
    await recentTagDB.setRecentTag({ tag: "" });
    // await updateDB();
  }

  const workBook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet([]);
  xlsx.utils.book_append_sheet(workBook, worksheet, "Sheet1");
  xlsx.writeFile(workBook, fileName);
}

function exportToDataExcelFile() {
  let file = xlsx.readFile("./Data.xlsx");
  let lineNumber = 0;
  dataDB.data.forEach((pieceOfData) => {
    // let thisData = [pieceOfData.dataPoint, ...pieceOfData.tags];
    // console.log(thisData);
    xlsx.utils.sheet_add_json(
      file.Sheets.Sheet1,
      //this is not working
      [[pieceOfData.dataPoint, ...pieceOfData.tags]],
      {
        skipHeader: 1,
        origin: lineNumber++,
      }
    );
    xlsx.writeFile(file, "./Data.xlsx");
  });
}

module.exports = { exportToExcel, createFile, exportToDataExcelFile };
