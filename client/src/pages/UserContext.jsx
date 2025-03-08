import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [uid, setUid] = useState("");
      const [semester,setSemester] = useState();
        const [avg,setAvg] = useState(0);
    
    return (
        <UserContext.Provider value={{ uid, setUid, semester, setSemester,avg,setAvg }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
