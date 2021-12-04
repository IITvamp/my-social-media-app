import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment"

import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";

const url = process.env.URL || "https://obscure-meadow-29718.herokuapp.com/api";


const { TextArea } = Input;

function Comments(props) {
    const [Comment, setComment] = useState("");
    const { user } = useContext(AuthContext);

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
        const res = await axios.post(url + "/comment/saveComment", newComment);
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
      {/* Comment Lists  */}
      {console.log(props.CommentLists)}

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
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
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
