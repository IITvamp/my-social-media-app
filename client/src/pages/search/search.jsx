import { useEffect, useContext, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Typography, CircularProgress, Grid, Divider } from "@material-ui/core";

import Post from "../../components/post/Post";
import { axiosInstance } from "../../config";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


export default function SearchPage() {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

      const { tags } = useParams();

    useEffect(() => {
        async function fetchPosts() {
            console.log(tags);
            const res = await axiosInstance.get(`/posts/search/${tags}`);
            console.log(res);
            setPosts(res.data);
        }
        fetchPosts();
        
    }, [tags]);

    
      if (!posts.length) return "No posts";

    return (
      <>
        <Typography variant="h2">{tags}</Typography>
        <Divider style={{ margin: "20px 0 50px 0" }} />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </>
    );
}