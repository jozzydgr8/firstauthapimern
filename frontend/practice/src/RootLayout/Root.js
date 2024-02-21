import { NavLink, Outlet } from "react-router-dom";
import { UseLogOut } from "../Hooks/UseLogout";
import { UseAuthContext } from "../Context/UseAuthContext";


export default function () {
  const {logOut} = UseLogOut()
  const {user} = UseAuthContext()
  const handleLogOut = ()=>{
    logOut()
  }
  
  return (
    <div>
        <nav>
            <NavLink to={'/'}>Workout buddy</NavLink>


                
         <div>
          {
            user && <div><span>{user.email}</span> <button className="navButton" onClick={handleLogOut}>logOut</button></div>
          }
          
          </div> 
          {
            !user &&<div><NavLink to={'login'}>login</NavLink><NavLink to={'signup'}>signup</NavLink></div>
          }

        </nav>

        <main>
            <Outlet/>
        </main>
    </div>
  )
}
