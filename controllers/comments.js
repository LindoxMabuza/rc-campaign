const Comment = require("../models/Comment");

module.exports = {
  // getComment: async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     res.render("post.ejs", { post: post, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        postId: req.params.id,
        user: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
