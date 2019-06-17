const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("manga_scrape/db.json");
const db = low(adapter);

db.defaults({ boruto: {} })
  .write();

module.exports = db;