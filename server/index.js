const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");
const http = require("http");
app.use(express.json());
const PORT = 9000;
const config = require("./config/db.json");

const server = http.createServer(app);

const connectDataBase = config.database.mongodb.atlas;

server.listen(PORT, () => {
  console.log("server started on Port : ", PORT);
  mongoose
    .connect(connectDataBase)
    .then(() => console.log("💻 Mondodb Connected"))
    .catch((err) => console.error(err));
});
