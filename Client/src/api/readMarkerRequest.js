export default (arg) =>{
    return fetch(`http://localhost:3001/?username=${arg.queryKey[1]}`, 
    {
        method: "GET",
    })
    .then(response=>response.json())
}