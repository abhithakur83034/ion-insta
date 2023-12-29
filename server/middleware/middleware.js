
const jwt = require("jsonwebtoken");
const secretKey = "my-secret";

const middleware = {
   verifyToken : (req, res, next) => {
    // console.log(req.headers);
    let token = req.headers["authorization"];
    // console.log(token);
    if (token) {
      token = token.split(" ")[1];
      console.log(token);
      jwt.verify(token, secretKey, async(error, success) => {
        if (error) {
            console.log(error);
          res.send({message:"Please provide valid token"});
        } else {
         
          next();
        }
      });
    } else {
      res.status(500).send({message:"Please add token with headers."});
    }
  }

}


module.exports = middleware ;