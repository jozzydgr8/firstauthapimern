import React from 'react'
import { UseContext } from '../Context/UseContext'
import {formatDistanceToNow} from 'date-fns'
import { UseAuthContext } from '../Context/UseAuthContext'

export default function ({state}) {
  const {user} = UseAuthContext()
  const {dispatch} = UseContext()
  const deleteData= async (id)=>{
    if(!user){
      return
    }
    const response = await fetch(`api/info/${id}`, {
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      }

    })

    const json = await response.json()
    if(response.ok){
      dispatch({type:'deleteData', payload:json})
    }
   

  }
  return (
    <div className='data'>
    
    <h3>
      Title:  {state.title}
    </h3>
    <p>
      reps:  {state.reps} 
    </p>
    <p>
       Load (kg): {state.load} 
    </p>
    <p>
      {formatDistanceToNow(new Date(state.createdAt), {addSuffix: true})}
    </p>

    <span className="material-icons" onClick={()=>deleteData(state._id)}>delete_outline</span>
    </div>
  )
}
