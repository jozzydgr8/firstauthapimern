import { useState } from "react"
import { UseAuthContext } from "../Context/UseAuthContext"
import { UseContext } from "../Context/UseContext"
export const PostHook = ()=>{
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const { user} = UseAuthContext();
    const {dispatch} = UseContext(); 
    const postInfo = async (title, reps, load)=>{
        if(!user){
            setMessage('user has to be logged in')
            return (message)
        }
        const response = await fetch('/api/info/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body:JSON.stringify({title,reps,load})
        })

        const json = await response.json()
        if(!response){
            setError(json.error);
            setMessage(json.message)
        }
        if(response){
        dispatch({type:'createdata', payload:json})
        console.log(json)
        }
    }

    return {postInfo, error, message}
}