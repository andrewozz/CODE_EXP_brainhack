import React,{useState, createContext,useContext } from "react";

export const ItemContext = createContext({});
export const useItem = () => useContext(ItemContext);


export const ItemProvider = (props) => {
    
    const [itemInfo,setItemInfo] = useState({});

    return (
            <ItemContext.Provider value={{itemInfo,setItemInfo}}>
                {props.children}
            </ItemContext.Provider> 
    )
}

