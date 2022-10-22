const { token } = require("morgan");
const Post = require("../models/Post");
const User = require("../models/User");
const ApiUser = require("../models/ApiUser");
const validator = require("validator");

module.exports = {
  getIndex: async (req, res) => {
    try {
      console.log("params", req.params.call);
      if (req.params.call == "campaigns") {
        const posts = await Post.find().sort({ createdAt: "desc" }).lean();
        console.log("posts", posts);
        res.send({ campaigns: posts });
      } else if (req.params.call == "users") {
        const users = await User.find();
        const clean_users = users.map((e) => e.email);
        res.send({ users: users });
      } else {
        res.send({ msg: "invalid data request" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getApis: async (req, res) => {
    try {
      // res.send({ msg: "It's working" });
      const posts = await Post.find();
      const users = await User.find();
      res.render("api.ejs", { user: req.user });
    } catch (err) {
      res.send({ msg: "404: Page not found!" });
    }
  },
  getAuthPage: (req, res) => {
    res.render("api_auth.ejs", { email: "", token: "", user: "" });
  },
  getApi: async (req, res) => {
    try {
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
  getAuthUserPage: (req, res) => {
    res.render("api_auth_user.ejs", { email: "", token: "", user: "" });
  },
  postAuth: async (req, res, next) => {
    // const validationErrors = [];
    // if (!validator.isEmail(req.body.email))
    //   validationErrors.push({ msg: "Please enter a valid email address." });
    // if (validationErrors.length) {
    //   req.flash("errors", validationErrors);
    //   return res.redirect("/api/auth");
    // }
    // req.body.email = validator.normalizeEmail(req.body.email, {
    //   gmail_remove_dots: false,
    // });
    const rand = () => {
      return Math.random().toString(36).substr(2);
    };

    const getToken = () => {
      return rand() + rand();
    };
    const token = getToken();
    console.log("ApiAuth details!", {
      email: req.body.email,
      token: token,
    });
    try {
      await ApiUser.create({
        email: req.body.email,
        token: token,
      });
      console.log("ApiAuth has been added!", {
        email: req.body.email,
        token: token,
      });
      res.render("api_auth_user", {
        email: req.body.email,
        token: token,
        user: "",
      });
      // res.redirect("/api/api_auth_user");
    } catch (err) {
      console.log(err);
    }
  },
  //   getIndex: async (req, res) => {
  //     try {
  //       const posts = await Post.find().sort({ createdAt: "desc" }).lean();
  //       const users = await User.find();
  //       res.render("index.ejs", { posts: posts, users: users, user: req.user });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
};
