const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const secretKey = "my-secret";
const path = require("path");
const nodemailer = require("nodemailer");
const secret_key = "mailSecret";
var randomstring = require("randomstring");
// const otpLength = 4;

const regUser = async (req, res) => {
  //console.log(req.body);
  //console.log(req.file);
  const checkmail = await userModel.findOne({ email: req.body.email, name:req.body.name });
  if (!checkmail) {
    try {
      const defaultImagePath = path.join(
        __dirname,
        "uploads",
        "image",
        "user.png"
      );
      const defaultImageRelativePath = path.basename(defaultImagePath);
      const registerData = {
        image: defaultImageRelativePath,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        cpassword: req.body.confirmpassword,
        role: req.body.role,
      };
      const user = await userModel.insertMany(registerData);
      res.status(200).json({ message: user, status: "success" });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  } else {
    res.json({ message: "user already exist", status: "warning" });
  }
};

const logUser = async (req, res) => {
  //console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ user }, secretKey, { expiresIn: "2h" });
      res.json({ user, token, status: "success" });
    } else {
      res.status(401).send({ result: "Invalid credentials", status: "fail" });
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const registeredUser = async (req, res) => {
  try {
    const reg = await userModel.find(req.body);
    res.status(200).json({ reg, status: "success" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

// put api for update=========================================================================================

const updateUserPut = async (req, res) => {
  console.log("put req", req.body);
  //console.log("file", req.file);

  //console.log("id", req.params);

  try {
    const { name, username, bio, gender } = req.body;
    const updateFields = { name, username, bio, gender };

    if (req.file && req.file.filename) {
      updateFields.image = req.file.filename;
    }

    // Corrected the parameter to req.params.id
    const putUser = await userModel.updateOne(
      { _id: req.params.id },
      { $set: updateFields }
    );

    res.status(200).json({ putUser, status: "updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error", error);
  }
};

//generateOTP**************************************************************************************

// forgot password*******************************************************************************************
const forgotPasswordMail = async (req, res) => {
  //console.log("email", req.body);
  const email = req.body.email;
  if (email) {
    try {
      const checkEmail = await userModel.findOne({ email: req.body.email });
      //console.log(checkEmail);
      if (checkEmail) {
        //console.log("user found");

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: "abhishektha420@gmail.com",
            pass: "chel odzk wqtt zkjd",
          },
        });

        try {
          const userfind = await userModel.findOne({ email });
          // token generate for reset password
          const token = jwt.sign({ _id: userfind._id }, secret_key, {
            expiresIn: "1200s",
          });

          const otp = randomstring.generate({
            length: 4,
            charset: "numeric",
          });

          userfind.meta = otp;
          await userfind.save();

          const mailOptions = {
            from: "abhishektha420@gmail.com",
            to: email,
            subject: "Sending otp For password Reset",
            html: `<p>Your OTP for password reset is: ${otp}</p>`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              //console.log("error", error);
              res
                .status(401)
                .json({ status: "error", message: "email not send" });
            } else {
              //console.log("Email sent", info.response);
              res
                .status(201)
                .json({ status: "success", message: "Email sent Succsfully" });
            }
          });
        } catch (error) {
          //console.log(error);
        }
      } else {
        res.status(402).json({ message: "user not found", status: "warning" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.json({ message: "please enter email", status: "warning" });
  }
};

otpVerify = async (req, res) => {
  //console.log(req.body);
  try {
    const checkOtp = await userModel.findOne({ meta: req.body.otp });
    //console.log(checkOtp);
    if (checkOtp) {
      res.status(200).json({ checkOtp, status: "success" });
    } else {
      res.json({ message: "otp didn't match", status: "fail" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

setNewPassword = async (req, res) => {
  //console.log(req.params);
  //console.log(req.body);

  try {
    const set = await userModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { password: req.body.password } }
    );
    res.status(200).json({ set, status: "success" });
  } catch (error) {
    res.status(500).send(error);
  }
};


const changePassword= async (req,res)=>{
  //console.log(req.params);
  //console.log(req.body);
  if(req.body.newPassword === req.body.confirmPassword){
    const user = await userModel.findOne({_id : req.params.id})
    //console.log(user);
    if(user){
      if(user.password === req.body.oldPassword){
           try {
      const set = await userModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { password: req.body.confirmPassword } }
      );
      res.status(200).json({ set, status: "success" });
    } catch (error) {
      res.status(500).send(error);
    }
      }else{
        res.json({message:"old password does not mtch",status:"fail"})
      }

  }
  }else{
    res.json({message:"please check your new password & confirm password", status:"warn"})
  }
  
}




module.exports = {
  regUser,
  logUser,
  registeredUser,
  updateUserPut,
  forgotPasswordMail,
  otpVerify,
  setNewPassword,
  changePassword,
};
