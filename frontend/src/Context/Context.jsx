import { createContext, useState } from "react";

export const context = createContext();

export const AppContext = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    
    return (
        <context.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
        }}>
            {children}
        </context.Provider>
    );

}
