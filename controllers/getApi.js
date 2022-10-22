const { token } = require("morgan");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  getIndex: async (req, res) => {
    try {
      console.log("params", req.params.call);
      if (req.params.call == "campaigns") {
        const posts = await Post.find().sort({ createdAt: "desc" }).lean();

        res.send({ campaigns: posts });
      } else if (req.params.call == "users") {
        const users = await User.find();
        const clean_users = users.map((e) => e.email);
        res.send({ users: clean_users });
      } else {
        res.send({ msg: "invalid data request" });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
