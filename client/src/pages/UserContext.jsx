import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [uid, setUid] = useState("");
      const [semester,setSemester] = useState();
    
    return (
        <UserContext.Provider value={{ uid, setUid, semester, setSemester }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
