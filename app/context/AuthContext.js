import React,{useState, createContext,useContext } from "react";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = (props) => {
    
    // state variables & functions that you wish to pass down to children
    const [userInfo,setUserInfo] = useState({"nric":"", "name": "", "password": "", "role": "", "uid": ""})

    return (
            <AuthContext.Provider value={{userInfo,setUserInfo}}>
                {props.children}
            </AuthContext.Provider> 
    )
}

