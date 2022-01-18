import { axiosInstance } from "../../config.js";

import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment"

import { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  makeStyles,
  TextareaAutosize,
  Button,
} from "@material-ui/core";

import { Link } from "react-router-dom";


import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  textarea: {
    width: "80%",
    maxWidth: "80%",
    minWidth: 100,
    margin: "auto",
  },
  CommentBox: {
    display: "block",
    height: "content-fit",
    backgroundColor: "#1d252c",
    borderRadius: 8,
    textAlign: "left",
    padding: 24,
    width: "90%",
    margin: "auto",
  },
  commentspan: {
    
    fontSize: 20,
    fontWeight: 900,
    display: "inline-block",
    marginRight: 4,
    marginBottom: 8,
  },
  commentscountpan: {
    fontSize: 20,
    fontWeight: 900,
    display: "inline-block",
    marginRight: 4,
    marginBottom: 8,
    color: "#53626f",
  },
  leftContainer: {
    width: 50,
  },

  // form

  replybox: {
    width: "100%",
    borderRadius: 8,
    border: "solid 1px #3d4953",
    overflow: "hidden",
    marginTop: 8,
  },
  textbox: {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#13181d",
    padding: 8,
    color: "#cccccc",
    border: "none",
  },
  panel: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#3d4953",
    padding: 8,
  },
  comment_as: {
    display: "inline-block",
    fontSize: 14,
    color: "#cccccc",
    marginRight: 8,
  },
  username: {
    display: "inline-block",
    fontSize: 14,
    color: "#4f9eed",
    marginRight: 8,
  },
}));

function Comments(props) {
    const [Comment, setComment] = useState("");
  const { user } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (Comment !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [Comment])
  
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
        const res = await axiosInstance.post("/comment/saveComment", newComment);
          setComment("");
        props.refreshFunction(res.data);
      } catch(e) {
          alert(e);
      }
  };

  return (
    <Box className={classes.CommentBox}>
      <Typography classname={classes.commentspan} stylr={{ color: "#FFF" }}>
        Comments
      </Typography>

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, i) =>
            !comment.responseTo && (
              <>
                <SingleComment
                  key={comment._id}
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
      <form onSubmit={onSubmit}>
        <>
          <Box className={classes.replybox}>
            <TextareaAutosize
              placeholder="What are your thoughts?"
              minRows={2}
              value={Comment}
              onChange={(value) => {
                setComment(value.target.value);
              }}
              className={classes.textbox}
            />
            <Box className={classes.panel}>
              <Typography classname={classes.comment_as}>
                Comment as{" "}
                <Link to="" className={classes.username}>
                  {user.firstname}
                </Link>
              </Typography>

              <Button
                disabled={disabled}
                classname={classes.submitbutton}
                onClick={onSubmit}
                style={{
                  display: "inline-block",
                  fontSize: 14,
                  marginLeft: "auto",
                  color: "#FFFFFF",
                  backgroundColor: "#4f9eed",
                }}
              >
                Comment
              </Button>
            </Box>
          </Box>
        </>
      </form>
    </Box>
  );
}

export default Comments;
