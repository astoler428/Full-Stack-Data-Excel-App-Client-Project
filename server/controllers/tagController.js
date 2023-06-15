const { dataDB, tagsDB, recentTagDB } = require("../db/databases.js");
const {
  exportToDataExcelFile,
  exportToTagsExcelFile,
} = require("../excel/excel.js");

//controller that returns the array of all tags (used by front end to set drop down)
function getAllTags(req, res) {
  res.json(tagsDB.tags);
}

//controller that returns the most recently used tag so it can be the default in the dropdown

async function getRecentTag(req, res) {
  let recentTag = recentTagDB.recentTag;
  res.json(recentTag);
}

//controller that handles the update request of the recent tag

async function updateRecentTag(req, res) {
  const recentTag = req.body;
  await recentTagDB.setRecentTag({ tag: recentTag.tag });
  res.json({});
}

//controller that handles the udpating of tags a random datapoint

async function updateTag(req, res) {
  //get the id of the datapoint and a list of the new tags
  const { id, newTags } = req.body;

  //find the datapoint in the database
  const dataPoint = dataDB.data.find((dp) => dp.id === id);

  //this array will hold tags that aren't already on the datapoint
  const nonDuplicateTags = [];

  //filter new tags by repeat and only add to tag database if not there
  newTags.forEach((newTag) => {
    if (!dataPoint.tags.includes(newTag)) dataPoint.tags.push(newTag);
    if (!tagsDB.tags.includes(newTag)) nonDuplicateTags.push(newTag);
  });

  await dataDB.setData(dataDB.data);
  await tagsDB.setTags([...tagsDB.tags, ...nonDuplicateTags]);

  exportToDataExcelFile();
  exportToTagsExcelFile();
  res.json({});
}

module.exports = {
  getAllTags,
  updateTag,
  updateRecentTag,
  getRecentTag,
};
