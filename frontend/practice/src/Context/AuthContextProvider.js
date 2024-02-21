import {createContext, useReducer, useEffect} from 'react';

export const AuthContext = createContext();


const authenticate = (state, action)=>{
    switch(action.type){
        case 'LOGIN':
            return {...state, user:action.payload}
        case "LOGOUT":
            return {...state, user:null}
        
        default: return state
    }
}

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(authenticate, {
        user:null
    })
     useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({type:'LOGIN', payload:user})
        }
     }, [])
    console.log('auth state:', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

