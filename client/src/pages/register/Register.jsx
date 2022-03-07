import "./register.css";

import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { TokenContext } from "../../context/TokenContext";
import { axiosInstance } from "../../config";

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useContext(TokenContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  // const [userContext, setUserContext] = useContext(UserContext);

  const history = useHistory();

  const LoginButtonHandler = () => {
    history.push("/login");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain !== password) {
      passwordAgain.setCustomValidity("Passwords don't match!");
    } else {
      setIsSubmitting(true);
      const ErrorMessage = "Something went wrong! Please try again later.";
      const user = {
        firstname: firstName,
        username: email,
        password: password,
        lastname: lastName,
        email: email,
      };
      try {
        const res = await axiosInstance.post("/auth/signup", user);
        setIsSubmitting(false);
        console.log(res.status);
        if (res.status !== 200) {
          if (res.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (res.status === 401) {
            setError("Invalid email and password combination.");
          } else if (res.status === 500) {
            console.log(res);
            if (res.message) setError(res.message || ErrorMessage);
          } else {
            setError(ErrorMessage);
          }
        } else {
          console.log(res);
          setToken(res.data.token);
          window.localStorage.setItem("newsshorts_token", res.data.token);
        }
        // history.push("/login");
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
            <h3 className="loginLogo">Newsshorts</h3>
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
    </div>
  );
}
