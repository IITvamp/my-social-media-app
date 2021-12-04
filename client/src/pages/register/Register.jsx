import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { GoogleLogin } from "react-google-login";

const url = process.env.URL || "https://obscure-meadow-29718.herokuapp.com/api";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const LoginButtonHandler = () => {
    history.push("/login")
  };

  const loginSuccess = () => {
    console.log("Login success")
  }

  const loginFailure = () => {
    console.log("Login success");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(url + "/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Inshorts</h3>
            <span className="loginDesc">
              Read any news in 10 seconds on Inshorts
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input
                placeholder="Username"
                required
                ref={username}
                className="loginInput"
              />
              <input
                placeholder="Email"
                required
                ref={email}
                className="loginInput"
                type="email"
              />
              <input
                placeholder="Password"
                required
                ref={password}
                className="loginInput"
                type="password"
                minLength="6"
              />
              <input
                placeholder="Password Again"
                required
                ref={passwordAgain}
                className="loginInput"
                type="password"
              />
              <button className="loginButton" type="submit">
                Sign Up
              </button>
              <button
                className="loginRegisterButton"
                onClick={LoginButtonHandler}
              >
                Log into Account
              </button>
            </form>
          </div>
        </div>
      </div>

      <GoogleLogin
        clientId="486729059700-ifbo2b2r6pmpfb7rctlu654snp89u10n.apps.googleusercontent.com"
        buttonText="login through google"
        isSignedIn={true}
        onSuccess={loginSuccess}
        onFailure={loginFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
