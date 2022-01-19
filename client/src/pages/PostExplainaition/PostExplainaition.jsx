import Topbar from "../../components/topbar/Topbar";
import Post from "../../components/post/Post";
import { useEffect, useState, useCallback, useContext } from "react";
import { axiosInstance } from "../../config.js";
import { useParams } from "react-router";
import Comments from "../../components/Comment/Comment";

import { AuthContext } from "../../context/AuthContext";
import { TokenContext } from "../../context/TokenContext";

export default function DetailPage() {
  const [post, setPost] = useState({ likes: [], tags: [] });
  const [CommentLists, setCommentLists] = useState([]);
  const [token, setToken] = useContext(TokenContext);
  const { user, dispatch } = useContext(AuthContext);

  const postId = useParams().postId;
  const fetchUseruser = useCallback(async () => {
    let error = "";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    dispatch({ type: "LOGIN_START" });

    const res = await axiosInstance.get("users/me", config);
    if (res.status !== 200) {
      if (res.status === 400) {
        error = "Please fill all the fields correctly!";
      } else if (res.status === 401) {
        error = "Invalid email and password combination.";
      } else {
        error = "some error occured. Please try again";
      }
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    } else {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    }
  }, [dispatch, token]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axiosInstance.get(`/posts/${postId}`);
      setPost(res.data);
      console.log(post);
      console.log("useEffect runs");
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    try {
      const fetchComments = async () => {
        console.log("fetch comment called");
        const res = await axiosInstance.get("/comment/getComment/" + postId);
        console.log(res.data);
        setCommentLists(CommentLists.concat(res.data));
      };
      fetchComments();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }, [postId]);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  return (
    <>
      <Topbar />
      <Post key={postId} post={post} />;
      <Comments
        CommentLists={CommentLists}
        postId={postId}
        refreshFunction={updateComment}
      />
    </>
  );
}
