import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import "./home.css";
import { useCallback, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";

export default function Home() {
  const [userContext, setUserContext] = useContext(UserContext);
  const { dispatch } = useContext(AuthContext);
  
  const fetchUseruser = useCallback(async () => {
    const config = {
      headers: { Authorization: `Bearer ${userContext.token}` },
    };
    const res =await axiosInstance.get("users/me", config);
    if (res.status === 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setUserContext((oldValues) => {
        return { ...oldValues, user: res.data };
      });
    } else {
      if (res.status === 401) {
        // Edge case: when the token has expired.
        // This could happen if the refreshToken calls have failed due to network error or
        // User has had the tab open from previous day and tries to click on the Fetch button
        window.location.reload();
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, user: null };
        });
      }
    }
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    if (!userContext.user) {
      fetchUseruser();
    }
  }, [userContext.user, fetchUseruser]);

  const refetchHandler = () => {
    // set user to undefined so that spinner will be displayed and
    //  fetchUseruser will be invoked from useEffect
    setUserContext((oldValues) => {
      return { ...oldValues, user: undefined };
    });
  };


  return (
    <>
      {!userContext.user ? (
        <p>Loading...</p>
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
