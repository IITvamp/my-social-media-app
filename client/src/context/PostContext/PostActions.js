export const PostFetchingStart = (userCredentials) => ({
  type: "POST_FETCHING_START",
});

export const PostFetchingSuccess = (posts) => ({
  type: "POST_FETCHING_SUCCESS",
  payload: posts,
});

export const PostFetchingFailure = () => ({
  type: "POST_FETCHING_FAILURE",
});
