import { useState } from "react"
import {UseAuthContext} from '../Context/UseAuthContext'

export const UseSignUp =()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = UseAuthContext()

    //make post request
    const signUp = async (email, password)=>{
        setIsLoading(true);
        setError(false)
    const response = await fetch('/api/user/signup', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email, password})
    })

    const json = await response.json()
    if(!response.ok){
        setError(json.error)
        setIsLoading(false);
    }

    if (response.ok){
        // set storage
         localStorage.setItem('user', JSON.stringify(json));
        dispatch({type:'LOGIN', payload:json})

        setIsLoading(false)
    }
}
    return {error, isLoading, signUp}
}

