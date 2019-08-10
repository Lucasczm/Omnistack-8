const express = require("express");
const routes = express.Router();
const UserController = require("./controllers/UserController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

routes.get("/user", UserController.index);
routes.post("/user", UserController.store);
routes.post("/user/:userId/likes", LikeController.store);
routes.post("/user/:userId/unlikes", DislikeController.store);
routes.get("/user/likes", LikeController.index);
routes.get("/user/unlikes", DislikeController.index);
routes.delete("/user/:userId/likes", LikeController.remove);
routes.delete("/user/:userId/unlikes", DislikeController.remove);

module.exports = routes;
