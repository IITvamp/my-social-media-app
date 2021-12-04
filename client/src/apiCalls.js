import axios from "axios";

const url = "https://obscure-meadow-29718.herokuapp.com/api";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${url}/auth/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  } 
};

