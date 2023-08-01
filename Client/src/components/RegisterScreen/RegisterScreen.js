import { useContext, useState } from "react"
import registerRequest from "../../api/registerRequest"
import { TokenContext } from "../../App"
import { useNavigate } from "react-router-dom"
export default function RegisterScreen(){
    

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)
    const [picture, setPicture] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
    const [token, setToken] = useContext(TokenContext)
    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage("Passwords Do Not Match")
        }else{
            e.preventDefault();
            registerRequest(name,email,password, picture).then(({token,email,password,name,_id})=>{
                setToken(token)
                localStorage.setItem("user",email)
                navigate("/")
            }).catch(err=>{
                setMessage(err.message)
            })
            }
        }
    
    
    return(
        <div>
            <h1>Register</h1>
            {message && <h3>{message}</h3>}
            <form onSubmit={handleSubmit}>
                <input type = "name" placeholder="Enter Your Name" onChange={(e)=>{setName(e.target.value)}}/>
                <input type="email" placeholder="Enter Your Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" placeholder="Enter Your Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <input type="password" placeholder="Confirm Your Password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}