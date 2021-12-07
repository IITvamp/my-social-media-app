
import CommentCard from "./CommentCard";

function SingleComment(props) {

  return (
    <div>
      <CommentCard
        comment={props.comment}
        refreshFunction={props.refreshFunction}
        postId={props.postId}
      ></CommentCard>
    </div>
  );
}

export default SingleComment;
