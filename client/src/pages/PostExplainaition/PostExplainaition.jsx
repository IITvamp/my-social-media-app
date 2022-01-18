import Topbar from "../../components/topbar/Topbar";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import {axiosInstance} from "../../config.js"
import { useParams } from "react-router";
import Comments from "../../components/Comment/Comment";


export default function DetailPage() {
    const [post, setPost] = useState({ likes: [], tags: [] });
    const [CommentLists, setCommentLists] = useState([]);
    const postId = useParams().postId;
  // console.log(postId);

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
          //  console.log(res);
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