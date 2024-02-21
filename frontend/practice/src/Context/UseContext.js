import { context } from './ContextProvider'
import { useContext } from 'react'


export const UseContext = ()=>{
    const contextUser = useContext(context)

    if(!contextUser){
        throw Error('context requires provider')
    }
    return contextUser
}