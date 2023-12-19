const express = require("express");
const cors = require("cors");
const app = express();

const userRoute = require('./Route/userRoute');
const postsRoute = require('./Route/postRoute');


app.use(cors());
app.use(express.json());
app.use("/img", express.static("./uploads"));


app.use('/api',userRoute);
app.use('/api',postsRoute);




module.exports = app;
