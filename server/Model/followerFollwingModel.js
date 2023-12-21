const mongoose = require('mongoose');
const followerFollowingMigration = require('../migration/followerFollowingMigration.json');
const FollowerFollowingMigration = new mongoose.Schema(followerFollowingMigration);
module.exports = mongoose.model("followerFollowing",FollowerFollowingMigration);