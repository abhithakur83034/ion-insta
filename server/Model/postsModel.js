const mongoose = require('mongoose');
const postsMigration = require('../migration/postsMigration.json');
const PostsMigration = new mongoose.Schema(postsMigration);
module.exports = mongoose.model("posts",PostsMigration);