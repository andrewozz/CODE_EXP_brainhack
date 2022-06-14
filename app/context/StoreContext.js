import React,{useState, createContext,useContext } from "react";

export const StoreContext = createContext({});
export const useStore = () => useContext(StoreContext);


export const StoreProvider = (props) => {
    
    const [campName,setCampName] = useState("");
    const [storeIdName,setstoreIdName] = useState("");
    const [storeItems,setStoreItems] = useState([]);
    const [activities,setActivities] = useState([]);
    const [update,setUpdate] = useState(0);
    

    return (
            <StoreContext.Provider value={{storeItems,setStoreItems,campName,setCampName,
                activities,setActivities,storeIdName,setstoreIdName,update,setUpdate}}>
                {props.children}
            </StoreContext.Provider> 
    )
}

