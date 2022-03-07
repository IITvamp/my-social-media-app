import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { TokenContext } from "../../context/TokenContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";

import { axiosInstance } from "../../config";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useContext(TokenContext);

  const ErrorMessage = "OOPs! Something went wrong";

  const history = useHistory();
  // const {issubmitting, dispatch } = useContext(AuthContext);

  const RegisterButtonHandler = () => {
    history.push("/register");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await axiosInstance.post(`/auth/login`, {
      username: email,
      password: password,
    });

    setIsSubmitting(false);
    if (res.status !== 200) {
      if (res.status === 400) {
        setError("Please fill all the fields correctly!");
      } else if (res.status === 401) {
        setError("Invalid email and password combination.");
      } else {
        setError(ErrorMessage);
      }
    } else {
      console.log(res.data.token);
      setToken(res.data.token);
      window.localStorage.setItem("newsshorts_token", res.data.token);
      console.log(token);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Newsshorts</h3>
          <span className="loginDesc">
            Read any news in 10 seconds on NewsShorts
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="loginButton"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={RegisterButtonHandler}
            >
              {isSubmitting ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
