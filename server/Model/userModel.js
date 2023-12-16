const mongoose = require('mongoose');
const userMigration = require('../migration/usermigration.json');
const UserMigration = new mongoose.Schema(userMigration);
module.exports = mongoose.model("user",UserMigration);