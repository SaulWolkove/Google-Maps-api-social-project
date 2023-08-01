import { useContext, useEffect, useState } from "react";
import loginRequest from "../../api/loginRequest";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../App";

export default function LoginScreen(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [user, setUser] = useState(null)

    const navigate = useNavigate()
    const [token, setToken] = useContext(TokenContext)


    useEffect(() => {
        const loggedInUser = localStorage.getItem("userInfo");
        if(loggedInUser){
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser)
            navigate("/")
        }
    })


    const handleLogin= (e)=>{
        e.preventDefault();
        loginRequest(email,password).then(({token,email,password,name,_id})=>{
            setToken(token)
            localStorage.setItem("user",email)
            navigate("/")
        }).catch(err=>{
            setError(err.message)
        })

    }

    return(
        <div>
            <div>{error}</div>
            <form onSubmit={handleLogin}>
                <h2>email</h2>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <h2>Password</h2>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}