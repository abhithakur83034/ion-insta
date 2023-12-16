const express = require('express');
const userController = require('../Controller/userController')
const router = express.Router()
const multer = require('multer')

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
      file.mimetype === "image/png"
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
  
router.post('/register',upload.single("image"),userController.regUser);
router.post('/login',userController.logUser);
router.get('/registereduser',userController.registeredUser);
router.put('/userupdate/:id',upload.single("image"),userController.updateUserPut);
router.post('/forgetpasswordmail',userController.forgotPasswordMail)
router.post('/otpverify',userController.otpVerify)
router.put('/setPassword/:id',userController.setNewPassword)
router.put('/changePassword/:id',userController.changePassword)

module.exports = router;