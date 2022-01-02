import { axiosInstance } from "./config";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axiosInstance.post(`/auth/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
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



