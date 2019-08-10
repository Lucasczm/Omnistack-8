"use strict";

require("dotenv").config();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGO_CONN, {
  useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port);
console.log(`Running on http://localhost:${port}`);
