const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: "",
      };
    case "LOGIN_SUCCESS":
      console.log(action.payload)
      return {
        user: action.payload,
        isFetching: false,
        error: "",
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
