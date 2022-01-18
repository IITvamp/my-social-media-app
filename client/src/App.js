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
import {TokenContext} from "./context/TokenContext";

function App() {
  const { user } = useContext(AuthContext);
  const  [token, setToken ] = useContext(TokenContext);

  console.log(token);

  const verifyUser = useCallback(async () => {
    const res =await axiosInstance.post("/auth/refreshToken");
    
    if (res.status === 200) {
      setToken(res.data.token);
    }
    else {
      setToken(null);
      }   
  }, [setToken, token]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);



  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {token ? <Home /> : <Login />}
        </Route>
        <Route path="/login">
          {token ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {token ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/newPost">
          {token ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:userid">{user ? <Profile /> : <Login />}</Route>
        <Route exact path="/post/:postId">
          {token ? <DetailPage /> : <Login />}
        </Route>
        <Route path="/tags/:tags">{user ? <SearchPage /> : <Login />}</Route>
        <Route exact path="/post/edit/:postId">
          {token ? <UpdatePost /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
