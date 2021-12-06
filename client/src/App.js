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
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/newPost">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:userid">
          <Profile />
        </Route>
        <Route exact path="/post/:postId">
          <DetailPage />
        </Route>
        <Route path="/tags/:tags">
          <SearchPage />
        </Route>
        <Route exact path="/post/edit/:postId">
          <UpdatePost />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
