import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [uid, setUid] = useState("");

    return (
        <UserContext.Provider value={{ uid, setUid }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
