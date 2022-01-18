const PostReducer = (state, action) => {
  switch (action.type) {
    case "POST_FETCHING_START":
      return {
        posts: null,
        isFetching: true,
        error: false,
      };
      case "POST_FETCHING_SUCCESS":
          console.log(action.payload)
      return {
        posts: action.payload,
        isFetching: false,
        error: false,
      };
    case "POST_FETCHING_FAILURE":
      return {
        posts: null,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default PostReducer;
