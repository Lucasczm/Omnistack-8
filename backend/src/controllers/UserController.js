const axios = require("axios");
const User = require("../models/User");

class UserController {
  async index(req, res) {
    const { loggedid } = req.headers;
    const user = await User.findById(loggedid);
    const users = await User.find({
      $and: [
        { _id: { $ne: loggedid } },
        { _id: { $nin: user.likes } },
        { _id: { $nin: user.dislike } }
      ]
    });
    return res.send(users);
  }

  async store(req, res) {
    const { username } = req.body;
    const userExist = await User.findOne({
      username: username.toLowerCase()
    });

    if (userExist) {
      return res.status(200).json(userExist);
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const { login, name, avatar_url: photo } = response.data;
    const user = await User.create({
      username: login.toLowerCase(),
      name,
      photo
    });
    res.status(201).send(user);
  }
}
module.exports = new UserController();
