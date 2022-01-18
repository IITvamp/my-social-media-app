import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { PostContextProvider } from "./context/PostContext/PostContext";
import { TokenProvider } from "./context/TokenContext";

ReactDOM.render(
  <React.StrictMode>
    <TokenProvider>
      <AuthContextProvider>
        <PostContextProvider>
          <App />
        </PostContextProvider>
      </AuthContextProvider>
    </TokenProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
