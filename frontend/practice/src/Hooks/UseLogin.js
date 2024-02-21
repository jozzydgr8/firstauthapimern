import { useState } from "react"
import { UseAuthContext } from "../Context/UseAuthContext";

export const UseLogin = ()=>{
    const [error, setError] = useState(null);
    const {dispatch} = UseAuthContext()
    const [isLoading, setIsLoading] = useState(null);

    const login = async (email, password)=>{
        setError(null);
        setIsLoading(true);
        
        const response = await fetch('/api/user/login', {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        });
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if(response.ok){
            setError(null)
            setIsLoading(false)

            //add to localStorage
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type:'LOGIN',payload:json})
        }

    }

    return {error, isLoading, login}
}