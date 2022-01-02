import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import DetailPage from "./pages/PostExplainaition/PostExplainaition";
import SearchPage from "./pages/search/search";
import UpdatePost from "./pages/updatePost/updateForm"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext, useCallback, useEffect } from "react";
import { axiosInstance } from "./config";
import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(AuthContext);
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(async () => {
    const res =await axiosInstance.post("/auth/refreshToken");
    
      if (res.status===200) {
        setUserContext((oldValues) => {
          return { ...oldValues, token: res.data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
   
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);



  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {userContext.token ? <Home /> : <Login />}
        </Route>
        <Route path="/login">
          {userContext.token ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {userContext.token ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/newPost">
          {userContext.token ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:userid">{user ? <Profile /> : <Login />}</Route>
        <Route exact path="/post/:postId">
          {userContext.token ? <DetailPage /> : <Login />}
        </Route>
        <Route path="/tags/:tags">{user ? <SearchPage /> : <Login />}</Route>
        <Route exact path="/post/edit/:postId">
          {userContext.token ? <UpdatePost /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
