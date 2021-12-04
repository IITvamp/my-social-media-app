import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import CommentBox from './CommentBox'

const { TextArea } = Input;
function SingleComment(props) {
  const [CommentValue, setCommentValue] = useState("");
    const [OpenReply, setOpenReply] = useState(false);
    const { user } = useContext(AuthContext);
    
      const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      user: user._id,
      postId: props.postId,
      responseTo: props.comment._id,
      content: CommentValue,
    };

      Axios.post("/comment/saveComment", variables).then((response) => {
        setCommentValue("");
        setOpenReply(!OpenReply);
        props.refreshFunction(response.data);
    });
  };

  const actions = [
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to{" "}
    </span>,
  ];

  return (
    <div>
      <CommentBox/>
      <Comment
        actions={actions}
        author={props.comment.user.username}
        avatar={<Avatar src={PF + "person/noAvatar.png"} alt="image" />}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="write some comments"
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
