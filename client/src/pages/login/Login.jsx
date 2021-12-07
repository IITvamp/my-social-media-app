import { useContext, useRef } from "react";
import "./login.css";
import { loginCall, adduser } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";
import { GoogleLogin } from "react-google-login";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const history = useHistory();
  const { isFetching, dispatch } = useContext(AuthContext);

  const RegisterButtonHandler = () => {
    history.push("/");
  }

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const loginSuccess = async (res) => {
    console.log(res.profileObj);
    adduser(
      {
        email: res.profileObj.email,
        userName: res.profileObj.name,
        googleid: res.profileObj.googleId,
        profilePicture: res.profileObj.imageUrl,
      },
      dispatch
    );
    console.log("Login success");
  };

  const loginFailure = () => {
    console.log("Login success");
  };


  return (
    <div className="login">
      {/* <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Inshorts</h3>
          <span className="loginDesc">
            Read any news in 10 seconds on Inshorts
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
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
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form> */}

          <GoogleLogin
            clientId="486729059700-ifbo2b2r6pmpfb7rctlu654snp89u10n.apps.googleusercontent.com"
            buttonText="login through google"
            isSignedIn={true}
            onSuccess={loginSuccess}
            onFailure={loginFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
    //   </div>
    // </div>
  );
}
