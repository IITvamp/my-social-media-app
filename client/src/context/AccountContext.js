import { createContext, useState, useRef } from "react";

export const chatContext = createContext(null);

export const ChatProvider = () => {

    const [activeUsers, setActiveUsers] = useState([]);

    const [newMessageFlag, setNewMessageFlag] = useState(false);

    return (
      <chatContext.Provider
        value={(activeUsers, setActiveUsers, newMessageFlag, setNewMessageFlag)}
      ></chatContext.Provider>
    );

}


