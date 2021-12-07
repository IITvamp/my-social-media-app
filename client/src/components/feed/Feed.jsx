import { useContext, useEffect, useState, useRef, useCallback } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosInstance } from "../../config.js";


const url = process.env.URL || "https://obscure-meadow-29718.herokuapp.com/api";

export default function Feed({ userId }) {
  
  const [page, setPage] = useState(1);
  
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log(userId)
      const res = userId
        ? await axiosInstance.get("/posts/profile/" + userId)
        : await axiosInstance.get("posts/timeline/" + user._id);
      
      // await res.data.sort((p1, p2) => {
      //   return new Date(p2.createdAt) - new Date(p1.createdAt);
      // });
      setPosts(res.data);
      console.log(res.data);
    };
    fetchPosts();
  }, [userId, user._id]);

  return (
    // <InfiniteScroll
    //   dataLength={posts.length}
    //   next={() => setPage((page) => page + 1)}
    //   hasMore={true}
    // >
    <div>
      <Share/>
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
    // </InfiniteScroll>
  );
}
