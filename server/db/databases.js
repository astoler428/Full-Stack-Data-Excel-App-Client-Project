const fsPromises = require("fs").promises;
const path = require("path");

const dataDB = {
  data: require("../models/data.json"),
  setData: async function (data) {
    this.data = data;
    await updateDataDB();
  },
};

const tagsDB = {
  tags: require("../models/tags.json"),
  setTags: async function (data) {
    this.tags = data;
    await updateTagsDB();
  },
};

const recentTagDB = {
  recentTag: require("../models/recent-tag.json"),
  setRecentTag: async function (data) {
    this.recentTag = data;
    await updateRecentTagDB();
  },
};

async function updateTagsDB() {
  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "tags.json"),
    JSON.stringify(tagsDB.tags)
  );
}

async function updateDataDB() {
  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "data.json"),
    JSON.stringify(dataDB.data)
  );
}

async function updateRecentTagDB() {
  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "recent-tag.json"),
    JSON.stringify(recentTagDB.recentTag)
  );
}

module.exports = { dataDB, tagsDB, updateDataDB, updateTagsDB, recentTagDB };
