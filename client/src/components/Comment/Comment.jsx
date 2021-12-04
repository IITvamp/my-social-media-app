import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment"

import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import {TextareaAutosize, makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  textarea: {
    width:"80%",
    maxWidth: '80%',
    minWidth: 100,
    margin: "auto",
  }
}));

function Comments(props) {
    const [Comment, setComment] = useState("");
  const { user } = useContext(AuthContext);
  
  const classes = useStyles();

  const handleChange = async (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = async (e) => {
      e.preventDefault();
      console.log(props.postId);

    const newComment = {
      content: Comment,
      user: user._id,
      postId: props.postId,
    };
      console.log(newComment);
      try {
        const res = await axios.post("/comment/saveComment", newComment);
          setComment("");
        props.refreshFunction(res.data);
      } catch(e) {
          alert(e);
      }
  };

  return (
    <div>
      <br />
      <p> Comments </p>
      <hr />
      {props.CommentLists &&
        props.CommentLists.map(
          (comment, i) =>
            !comment.responseTo && (
              <>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </>
            )
        )}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextareaAutosize
          aria-label="comment box"
          placeholder="what are your thoughts"
          minRows={3}
          onChange={handleChange}
          value={Comment}
          className={classes.textarea}
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comments;
