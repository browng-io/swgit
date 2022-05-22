const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");

const { 
    DB_CONFIG_PATH, 
    DB_CONFIG_FILENAME 
} = require("../constants/config");
const homedir = require('os').homedir();
const file = path.resolve(homedir, DB_CONFIG_PATH, DB_CONFIG_FILENAME)

const adapter = new FileSync(file);
let db = null;

try {
    db = low(adapter);
} catch (error) {
    console.log(error)
}

module.exports = db;
