import { useContext, useEffect, useState, } from "react";

import ReactLoading from "react-loading";
import { Grid } from "@material-ui/core";

import Post from "../post/Post";
import Share from "../share/Share";
// import "./feed.css";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext/PostContext";
import { axiosInstance } from "../../config.js";

export default function Feed({ userId }) {
  const { user } = useContext(AuthContext);
  const { posts, dispatch } = useContext(PostContext);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log(userId);
      if (userId) {
        try {
          const res = await axiosInstance.get("/posts/profile/" + userId);
          dispatch({
            type: "POST_FETCHING_SUCCESS",
            payload: res.data,
          });
        } catch (error) {
          dispatch({
            type: "POST_FETCHING_FAILURE",
            payload: "some error occured",
          });
        }
      } else {
        console.log(user._id);
        try {
          const res = await axiosInstance.get("posts/timeline/" + user._id);
          dispatch({
            type: "POST_FETCHING_SUCCESS",
            payload: res.data,
          });
        } catch (error) {
          dispatch({
            type: "POST_FETCHING_FAILURE",
            payload: "some error occured",
          });
        }
       
      }
      
    };
    fetchPosts();
  }, [userId, user._id]);

  return (
    <div>
      <Share />
      {!posts ? (
        <ReactLoading
          type={"bars"}
          color={"#03fc4e"}
          height={100}
          width={100}
        />
      ) : (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </Grid>
      )}
    </div>
  );
}
