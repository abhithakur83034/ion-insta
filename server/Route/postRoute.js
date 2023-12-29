const express = require("express");
const postsController = require("../Controller/postController");
const multer = require("multer");
const middleware = require('../middleware/middleware')
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === 'video/mp3'||   
    file.mimetype === 'video/mp4' 
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

router.post("/uploadfiles/:id",middleware.verifyToken,upload.single("image"),postsController.addPost);
router.get('/get-all-posts',middleware.verifyToken,postsController.showPosts);
router.post('/like-posts',middleware.verifyToken,postsController.like);


module.exports = router;
