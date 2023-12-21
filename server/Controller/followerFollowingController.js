const followModel = require("../Model/followerFollwingModel");




const follow = async(req,res)=>{
    console.log(req.params);
    console.log(req.body);
    console.log(req.file);
    const  userId  = req.params.id;
    const {_id, image } = req.body;
    let following = _id;
console.log(following);
  
    try {
      const existingFollow = await followModel.findOne({ userId, following });
  console.log("existingFollow",existingFollow);
          if (existingFollow) {
            await followModel.findOneAndDelete(
              { userId, following },
              { $pull: { following, image } },
              { new: true }
            );
      
            return res.status(200).json({
              message: `Unfollow user with ID ${userId}`,
              status: "unfollow",
            });
          }else{
            const newFollower = await followModel.insertMany({ userId, following, image })
            res.status(200).json({
              message: `follow user with ID ${userId}`,
              status: "follow",
            });
          }
    } catch (error) {
      res.status(500).send("internal server error" + error);
    }
  }
  
  const getFollow = async (req, res) => {
    try {
      const getfollow = await followModel.find(req.body);
      res.status(200).send(getfollow);
    } catch (error) {
      res.status(500).send("internal server error" + error);
    }
  };
  
  const deleteFollow = async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      es.status(500).send("Internal server error");
    }
  };
  
  module.exports = {
    follow,
    getFollow,
    deleteFollow,
  };
  