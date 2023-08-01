import {API_URL} from "./config"

export default (name, email, password, picture)=>{
    return fetch(`${API_URL}/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password,
            picture
        })
    })
    .then(response=>{
        if (response.ok){
            return response.json()
        }else{
            throw new Error("Register Failed")
        }
    })
}