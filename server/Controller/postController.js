const postModel = require('../Model/postsModel');
const userModel = require('../Model/userModel')

const addPost=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.params.id);
    // console.log(req.file.filename);
    const image = req.file.filename;
    const {postId,name,userImage, caption} = req.body;
    const userId = req.params.id;
    let data = {image,caption,name,userImage,userId,postId}
    try {
        const post = await postModel.insertMany(data);
        res.status(200).json({post, status:"success"})
    } catch (error) {
        res.status(500).send(error)
    }
}

const showPosts=async(req,res)=>{
    try {
        const allPost = await postModel.find()
        // console.log(allPost);
        // const users = await userModel.find()
        // console.log(users);
        res.status(200).json({allPost , status:"success"})
    } catch (error) {
        res.status(500).send(error)
    }
}


const like = async (req, res) => {
    console.log("like",req.body);
  const {  likedBy,userId } = req.body;
  let postId = req.body._id
  console.log("postId",postId);
  try {
    const existingPost = await postModel.findOne({ _id:postId, likedBy,userId });
    console.log("existingPost",existingPost);
    if (existingPost) {
      await postModel.findOneAndUpdate(
        { _id:postId,userId },
        { $pull: {likedBy} },
        { new: true }
      );

      return res.status(200).json({
        message: `Disliked item with ID ${likedBy}`,
        status: "disliked",
      });
    }
  } catch (error) {
    res.status(500).send("Internal server error" + error);
  }


  const checkPost = await postModel.findOne({ _id:postId, userId});
console.log("checkPost",checkPost);
  if (checkPost) {
    const updatedPost = await postModel.findByIdAndUpdate(
      checkPost._id,
      { $addToSet: {likedBy} },
      { new: true }
    );

    if (updatedPost) {
      return res.status(200).json({ message: "Post liked", status: "liked" });
    } else {
      return res.status(404).json({ message: "Post not found" });
    }
  } else {
    try {
      const like = await postModel.insertMany({ postId, likedBy,userId });
      return res.status(200).json({ like, status: "liked" });
    } catch (error) {
      res.status(500).send("Internal server error" + error);
    }
  }
};




module.exports = {
    addPost,
    showPosts,
    like
}