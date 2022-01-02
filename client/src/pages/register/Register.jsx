import axios from "axios";
import { useState, useContext } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { GoogleLogin } from "react-google-login";

import { UserContext } from "../../context/UserContext";
import { axiosInstance } from "../../config";


const url = process.env.URL || "https://obscure-meadow-29718.herokuapp.com/api";

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const history = useHistory();

  const LoginButtonHandler = () => {
    history.push("/login")
  };

  const loginSuccess = () => {
    console.log("Login success")
  }

  const loginFailure = () => {
    console.log("Login failure");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain !== password) {
      passwordAgain.setCustomValidity("Passwords don't match!");
    }
    else {
      setIsSubmitting(true);
      const ErrorMessage = "Something went wrong! Please try again later.";
      const user = {
        firstname:firstName,
        username: email,
        password: password,
        lastname: lastName,
        email:email,
      };
      try {
        const res = await axiosInstance.post("/auth/signup", user);
        setIsSubmitting(false);
        console.log(res.status);
        if (res.status!==200) {
          if (res.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (res.status === 401) {
            setError("Invalid email and password combination.");
          } else if (res.status === 500) {
            console.log(res);
            if (res.message) setError(res.message ||ErrorMessage);
          }
          else {
            setError(ErrorMessage);
          }
        }
        else {
          console.log(res);
          setUserContext((oldValues) => {
            return { ...oldValues, token: res.data.token };
          });
        }
        history.push("/login");
      }
      catch (err) {
        console.log(err);
      }


      // const user = {
      //   username: username.current.value,
      //   email: email.current.value,
      //   password: password.current.value,
      // };
      // try {
      //   await axios.post(url + "/auth/register", user);
      //   history.push("/login");
      // } catch (err) {
      //   console.log(err);
      // }
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
                placeholder="First name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="loginInput"
              />
              <input
                placeholder="Last name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="loginInput"
              />
              <input
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="loginInput"
                type="email"
              />
              <input
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="loginInput"
                type="password"
                minLength="6"
              />
              <input
                placeholder="Password Again"
                required
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
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
