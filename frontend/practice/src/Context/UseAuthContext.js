import { AuthContext } from "./AuthContextProvider";
import { useContext } from "react";

export const UseAuthContext = ()=>{
    const context = useContext(AuthContext);

    if(!context){
        throw Error('auth context requires context provider')
    }

    return context
}