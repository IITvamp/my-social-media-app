import "./home.css";

import { useCallback, useEffect, useContext } from "react";
import ReactLoading from "react-loading";

import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import { AuthContext } from "../../context/AuthContext";
import { TokenContext } from "../../context/TokenContext";
import { axiosInstance } from "../../config";

export default function Home() {
  const { user, dispatch } = useContext(AuthContext);
  const [token, setToken] = useContext(TokenContext);

  const fetchUseruser = useCallback(async () => {
    let error = "";
    console.log(token);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    dispatch({ type: "LOGIN_START" });

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
    } else {
      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(res.data);
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!user) {
      fetchUseruser();
    }
  }, [user, fetchUseruser]);

  return (
    <>
      {!user ? (
       <ReactLoading
          type={"bars"}
          color={"#03fc4e"}
          height={100}
          width={100}
        />
      
      ) : (
        <>
          <Topbar />
          <div className="homeContainer">
            <Feed />
          </div>
        </>
      )}
    </>
  );
}
