const { dataDB, tagsDB, updateDB, recentTagDB } = require("../db/databases.js");
const path = require("path");
const { exportToDataExcelFile } = require("../excel/excel.js");

function getAllTags(req, res) {
  res.json(tagsDB.tags);
}

async function updateTag(req, res) {
  const { id, newTags } = req.body;

  const dataPoint = dataDB.data.find((dp) => dp.id === id);
  const originalTags = [];

  newTags.forEach((newTag) => {
    if (!dataPoint.tags.includes(newTag)) dataPoint.tags.push(newTag);
    if (!tagsDB.tags.includes(newTag)) originalTags.push(newTag);
  });

  await dataDB.setData(dataDB.data);
  await tagsDB.setTags([...tagsDB.tags, ...originalTags]);

  // newTags.forEach(async (newTag) => {
  //   if (!dataPoint.tags.includes(newTag)) {
  //     dataPoint.tags.push(newTag);

  //     //this line sets the data to itself, which is needed to call updateDB
  //     await dataDB.setData(dataDB.data);

  //     await tagsDB.setTags([...tagsDB.tags, newTag]);
  //     console.log(tagsDB.tags);
  //   }
  // });

  exportToDataExcelFile();

  res.json({});
}

async function updateRecentTag(req, res) {
  const recentTag = req.body;
  await recentTagDB.setRecentTag({ tag: recentTag.tag });
  res.json({});
}

async function getRecentTag(req, res) {
  let recentTag = recentTagDB.recentTag;
  res.json(recentTag);
}

module.exports = {
  getAllTags,
  updateTag,
  updateRecentTag,
  getRecentTag,
};
