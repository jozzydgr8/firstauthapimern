import { useState } from "react"
import { UseLogin } from "../../Hooks/UseLogin";

const Login = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = UseLogin()
    
   
    const handleSubmit = (event)=>{
        event.preventDefault();

        login(email,password)

    }
    return(
        <form className="login" onSubmit={handleSubmit}>
            <h1>log in</h1>
            <label>Email</label>
            <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)}
            value={email}/>
            <label>password</label>
            <input type="text" name="password" onChange={(e)=>setPassword(e.target.value)}
            value={password}/>
                {error ?<p className="error">{error}</p>:''}
            <button disabled ={isLoading}  type="submit">submit</button>
        </form>
    )
}

export default Login