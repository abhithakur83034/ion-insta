const express = require("express");
const cors = require("cors");
const app = express();

const userRoute = require('./Route/userRoute');


app.use(cors());
app.use(express.json());
app.use("/img", express.static("./uploads"));


app.use('/api',userRoute);




module.exports = app;
