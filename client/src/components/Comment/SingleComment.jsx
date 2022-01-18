
import React, { useState } from "react";
import { axiosInstance } from "../../config.js";

import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { format } from "timeago.js";
import { Comment } from "antd";

import {
  Box,
  Typography,
  makeStyles,
  TextareaAutosize,
  Button,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

import { Link } from "react-router-dom";
// import Rating from "./modifyComment/Rating";

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "left",
    padding: "16px 16px 16px 12px",
    margin: "16px 16px 16px 12px",
    border: "0.1px solid #3d4953",
    borderRadius: 8,
    // width: "90%",
    maxWidth:"inherit",
  },
  minimized: {
    display: "inline-block",
    cursor: "pointer",
    color: "#53626f",
  },
  commentUser: {
    display: "inline-block",
    color: "#4f9eed",
    // marginLeft: 10,
  },
  date: {
    display: "inline-block",
    color: "#53626f",
    marginLeft: 10,
  },
  editButton: {
    display: "inline-block",
    color: "#53626f",
  },
  content: {
    color: "#cccccc",
  },

  // form

  replybox: {
    width: "100%",
    borderRadius: 8,
    border: "solid 1px #3d4953",
    overflow: "hidden",
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
  submitbutton: {
    display: "inline-block",
    fontSize: 14,
    marginLeft: "auto",
    color: "#FFFFFF",
    backgroundColor: "#4f9eed",
  },
}));

function SingleComment(props) {

  const [CommentValue, setCommentValue] = useState("");
  const [content, setContent] = useState("");
  const [commentUser, setCommentUser] = useState("");
  const [updating, setupdating] = useState(false);

  const [OpenReply, setOpenReply] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (CommentValue !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [CommentValue]);

  const classes = useStyles();

  const comment = props.comment;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${comment.user}`);
      setCommentUser(res.data.firstname);
    };
    fetchUser();
  }, [comment.user]);

  const editiconclickhandler = () => {
    setupdating(!updating);
    setContent(comment.content);
  };
  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const handleUpdateChange = (e) => {
    setContent(e.currentTarget.value);
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onUpdate = (e) => {
    e.preventDefault();
    setCommentValue(content);

    const updatevariables = {
      user: user._id,
      postId: props.postId,
      responseTo: props.comment.responseTo,
      content: content,
    };

    axiosInstance
      .put("/comment/updateComment/"+comment._id, updatevariables)
      .then((response) => {
        setupdating(!updating);
        setContent(CommentValue);
        setCommentValue("");
        props.refreshFunction(response.data);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      user: user._id,
      postId: props.postId,
      responseTo: props.comment._id,
      content: CommentValue,
    };

    axiosInstance.post("/comment/saveComment", variables).then((response) => {
      setCommentValue("");
      setOpenReply(!OpenReply);
      props.refreshFunction(response.data);
    });
  };

  const actions = [
    // <LikeDislikes
    //   comment
    //   commentId={props.comment._id}
    //   userId={localStorage.getItem("userId")}
    // />,
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to{" "}
    </span>,
  ];


  return (
    <Box className={classes.card} key={comment._id}>
      {/* <Box className={classes.ratingBox}>
        <Rating comment={comment} />
      </Box> */}

      <Comment></Comment>

      <Box className={classes.rightContaier}>
        <Box className={classes.top}>
          <Typography className={classes.commentUser}>
            <Link to={`/profile/${comment.user}`}>{commentUser}</Link>
          </Typography>
          <Typography className={classes.date}>
            {format(comment.createdAt)}
          </Typography>
          <Typography className={classes.editButton}>
            <EditIcon onClick={editiconclickhandler} />
          </Typography>

          {updating ? (
            <form onSubmit={onUpdate}>
              <>
                <Box className={classes.replybox}>
                  <TextareaAutosize
                    placeholder="What are your thoughts?"
                    minRows={2}
                    value={content}
                    onChange={handleUpdateChange}
                    className={classes.textbox}
                  />
                  <Box className={classes.panel}>
                    <Typography classname={classes.comment_as}>
                      Comment as{" "}
                      <Link to="" className={classes.username}>
                        {user.firstname}
                      </Link>
                    </Typography>
                    <Box classname={classes.submitbutton}>
                      <Button
                        disabled={disabled}
                        classname={classes.submitbutton}
                        onClick={onUpdate}
                        style={{
                          display: "inline-block",
                          fontSize: 14,
                          marginLeft: "auto",
                          color: "#FFFFFF",
                          backgroundColor: "#4f9eed",
                        }}
                      >
                        Update
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </>
            </form>
          ) : (
            <Box className={classes.content}>{comment.content}</Box>
          )}
          <Typography
            onClick={() => {
              setOpenReply(openReply);
            }}
          >
            reply
          </Typography>
        </Box>
      </Box>

      {OpenReply && (
        <form onSubmit={onSubmit}>
          <>
            <Box className={classes.replybox} key={comment._id}>
              <TextareaAutosize
                placeholder="What are your thoughts?"
                minRows={2}
                value={CommentValue}
                onChange={handleChange}
                className={classes.textbox}
              />
              <Box className={classes.panel}>
                <Typography classname={classes.comment_as}>
                  Comment as{" "}
                  <Link to="" className={classes.username}>
                    {user.firstname}
                  </Link>
                </Typography>
                <Box classname={classes.submitbutton}>
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
            </Box>
          </>
        </form>
      )}
    </Box>
  );
}

export default SingleComment;
