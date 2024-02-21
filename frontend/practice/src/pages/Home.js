import React, { useEffect, useState } from 'react'
import { UseContext } from '../Context/UseContext'
import {UseAuthContext} from '../Context/UseAuthContext'
import Data from './Data'
import { PostHook } from '../Hooks/PostHook'
import {Form, redirect, useActionData} from 'react-router-dom'
export default function () {
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('')
    const {user} = UseAuthContext()
    const{dispatch, info}= UseContext();
    const {postInfo, error, message} = PostHook()
    useEffect(()=>{
        const fetchData = async ()=>{
            if(!user){
                return
            }
            const data = await fetch('/api/info/',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await data.json()
            if(data.ok){
                dispatch({type:'getData', payload:json})
                console.log(json)
            }
            if(!data){
                throw Error('cant fetch data')
            }

        }
        fetchData()
    }, [dispatch])
    const handleSubmit = (event)=>{
        event.preventDefault();

        postInfo(title, reps, load)
    }
    
  return (
    <div className='grid'>
        <div>
        {
            info && info.map(state=>(
                <Data key={state._id} state={state}>{state.title}</Data>
            ))
        }
        </div>
        {/* {
            errors && errors.empty && <p>{errors.empty}</p>
        } */}
        <form method='post' action='/' className='forms' >
             <input name='title' placeholder='title' onChange={(event)=>setTitle(event.target.value)} value={title} ></input>
             <input   name='reps' placeholder='reps(number)' onChange={(event)=>setReps(event.target.value)} value={reps}></input>
            <input name='load' placeholder='load (optional)' onChange={(event)=>setLoad(event.target.value)} value={load}></input>
            <button type='submit' onClick={handleSubmit}> submit</button>
            {message && <div>{message}</div>}
        </form>
        
   

    </div>
  )
}



