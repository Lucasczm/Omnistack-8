const User = require("./../models/User");
const sockect = require("socket.io");
class Like {
  async index(req, res) {
    const { loggedid } = req.headers;
    const users = await User.findById(loggedid).populate("likes", [
      "name",
      "username",
      "photo",
      "_id"
    ]);
    return res.send(users.likes);
  }
  async store(req, res) {
    const { loggedid } = req.headers;
    const { userId } = req.params;

    const { io, connectedUsers } = req;

    const user = await User.findById(loggedid);
    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(400).send({ error: "User not exist" });
    }
    if (targetUser.likes.includes(loggedid)) {
      const loggedSocket = connectedUsers[loggedid];
      const targetSockt = req.connectedUsers[targetUser._id];

      if (loggedSocket) {
        io.to(loggedSocket).emit("match", targetUser);
      }
      if (targetSockt) {
        io.to(targetSockt).emit("match", user);
      }
    }
    user.likes.push(targetUser._id);
    const save = await user.save();
    res.status(200).send(save);
  }
  async remove(req, res) {
    const { loggedid } = req.headers;
    const { userId } = req.params;

    const user = await User.findById(loggedid);
    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(400).send({ error: "User not exist" });
    }
    user.likes = user.likes.filter(
      _user => String(_user._id) !== String(targetUser._id)
    );

    const save = await user.save();
    res.status(200).send(save);
  }
}
module.exports = new Like();
