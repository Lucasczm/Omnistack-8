"use strict";

require("dotenv").config();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

mongoose.connect(process.env.MONGO_CONN, {
  useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(port);
console.log(`Running on http://localhost:${port}`);
