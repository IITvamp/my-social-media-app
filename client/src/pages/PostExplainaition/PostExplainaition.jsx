import Topbar from "../../components/topbar/Topbar";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Comments from "../../components/Comment/Comment"
// import Comment from "../../components/Comment/modifyComment/Comment";
// import CommentBox from "../../components/Comment/modifyComment/CommentBox";



export default function DetailPage() {
    const [post, setPost] = useState({ likes: [], tags: [] });
    const [CommentLists, setCommentLists] = useState([]);
    const postId = useParams().postId;
  console.log(postId);

    useEffect(() => {
        console.log("useEffect called");
        
      const fetchPost = async () => {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        console.log(post);
        console.log("useEffect runs");
        };
        
      fetchPost();
      console.log("fetchPost called ");
    }, [postId]);

    useEffect(() => {
      const fetchComments = async () => {
        console.log("fetch comment called");
        const res = await axios.get("/comment/getComment/" + postId);
        setCommentLists(res.data);
        console.log(res);
      };
      fetchComments();
      console.log("fetch comment called");
    }, [postId]);

    const updateComment = (newComment) => {
      setCommentLists(CommentLists.concat(newComment));
    };

    return (
      <>
        <Topbar />{console.log(post)}
        <Post key={postId} post={post} />;
        
        <Comments
          CommentLists={CommentLists}
          postId={postId}
          refreshFunction={updateComment}
        />
      </>
    );
}