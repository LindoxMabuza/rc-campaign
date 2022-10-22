const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  getIndex: async (req, res) => {
    try {
      res.render("index.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getExplore: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const users = await User.find();
      res.render("explore.ejs", { posts: posts, users: users, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
//   getIndex: async (req, res) => {
//     try {
//       const posts = await Post.find().sort({ createdAt: "desc" }).lean();
//       const users = await User.find();
//       res.render("index.ejs", { posts: posts, users: users, user: req.user });
//     } catch (err) {
//       console.log(err);
//     }
//   },
// };
