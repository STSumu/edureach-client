import { createContext } from "react";

export const authContext=createContext()
const AuthProvider = ({children}) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const authInfo={
        baseUrl,
    }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;