import { useState } from "react"
import { UseSignUp } from "../../Hooks/UseSignUp";

const SignUp = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {error, isLoading, signUp} = UseSignUp()
    const handleSubmit = async (event)=>{
        event.preventDefault();

        signUp(email, password)

        
    }
    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h1>sign up</h1>
            <label>Email</label>
            <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)}
            value={email}/>
            <label>password</label>
            <input type="text" name="password" onChange={(e)=>setPassword(e.target.value)}
            value={password}/>

            <button disabled={isLoading} type="submit">submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SignUp