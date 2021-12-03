const express = require("express");
const router = express.Router();
const  Comment = require("../models/Comment");

router.post("/saveComment", async (req, res) => {
 const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    
  } catch (err) {
    res.status(500).json(err.message);
  }
    
  });


router.get("/getComment/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
    } catch (error) {
        return res.status(400).send(error);
    }  

  });


module.exports = router;
