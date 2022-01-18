import React, { useState } from "react";

const TokenContext = React.createContext([{}, () => {}]);

let initialState = null;

const TokenProvider = (props) => {
  const [token, setToken] = useState(initialState);

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {props.children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
