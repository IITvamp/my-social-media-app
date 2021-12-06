const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.deleteOne();
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get paginated post
router.get("/myposts", async (req, res) => {
  try {
    const size = Number(req.query.size);
    const skip = Number(req.query.page);
    console.log(size, skip)
    const data = await News.find({}).limit(size).skip(size * skip);
    // console.log(data.count());
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
}
);

//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find();
    await userPosts.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/profile/:userId", async (req, res) => {
  try {
  console.log(req.params.userId);

  const user = await User.findById(req.params.userId);
    const posts = await Post.find({ userId: user._id });
    console.log(posts);
    
     await posts.sort((p1, p2) => {
       return new Date(p2.createdAt) - new Date(p1.createdAt);
     });
    

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});


//get posts by search
router.get("/search/:tags", async (req, res) => {
  const tags = req.params.tags;
  console.log(tags);
  try {
    const posts = await Post.find({
       tags: { $in: [tags]},
    });

    res.json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
