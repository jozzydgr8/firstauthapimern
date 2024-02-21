import {createContext, useReducer} from 'react'

export const context = createContext();

const reducer = (state, action)=>{
    switch(action.type){
        case 'getData':
            return {
                 ...state, info: action.payload
            }
            case 'createdata':
                return {
                    ...state, info :[action.payload, ...state.info]
                }
            case 'deleteData':
                return {
                    ...state, info : state.info.filter(v => v._id !== action.payload._id)
                }

            default : 
            return state
    }
}



export const ContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer,{
        info:null
    })
    return(
        <context.Provider value={{...state, dispatch}}>
            {children}
        </context.Provider>
    )
}