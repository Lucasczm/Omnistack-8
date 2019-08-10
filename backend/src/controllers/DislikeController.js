const User = require("./../models/User");

class Dislike {
  async index(req, res) {
    const { loggedid } = req.headers;
    const users = await User.findById(loggedid).populate("dislike", [
      "name",
      "username",
      "photo",
      "_id"
    ]);
    return res.send(users.dislike);
  }
  async store(req, res) {
    const { loggedid } = req.headers;
    const { userId } = req.params;

    const user = await User.findById(loggedid);
    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(400).send({ error: "User not exist" });
    }

    user.dislike.push(targetUser._id);
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
    user.dislike = user.dislike.filter(
      _user => String(_user._id) !== String(targetUser._id)
    );

    const save = await user.save();
    res.status(200).send(save);
  }
}

module.exports = new Dislike();
