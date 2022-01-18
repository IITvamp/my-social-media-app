import { axiosInstance } from "./config";


export const LoginCall = async (config, dispatch) => {
  var error = "";
  dispatch({ type: "LOGIN_START" });
  console.log(config);
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
  }
  else {
    console.log(res.data);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log(res.data);
  }
};


export const logoutCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axiosInstance.post(`/auth/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const fetchPosts = async (dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axiosInstance.post(`/auth/login`)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};



