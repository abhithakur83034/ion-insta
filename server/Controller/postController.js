const postModel = require('../Model/postsModel');
const userModel = require('../Model/userModel')

const addPost=async(req,res)=>{
    console.log(req.body);
    console.log(req.params.id);
    console.log(req.file.filename);
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
        console.log(allPost);
        // const users = await userModel.find()
        // console.log(users);
        res.status(200).json({allPost , status:"success"})
    } catch (error) {
        res.status(500).send(error)
    }
}


const like=async(req,res)=>{
    console.log("body",req.body);
    console.log("param",req.param.id);
    try {
        
    } catch (error) {
       res.status(500).send(error); 
    }
}



module.exports = {
    addPost,
    showPosts,
    like
}