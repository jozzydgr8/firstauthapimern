import {UseAuthContext} from '../Context/UseAuthContext'
import { UseContext } from '../Context/UseContext'
 export const UseLogOut = ()=>{
    const {dispatch} = UseAuthContext();
    const {dispatch: workDispatch} = UseContext()

    const logOut = ()=>{

    localStorage.removeItem('user');
    dispatch({type:'LOGOUT'})
    workDispatch({type:'getData', payload:null})
    }

    return {logOut}
 }