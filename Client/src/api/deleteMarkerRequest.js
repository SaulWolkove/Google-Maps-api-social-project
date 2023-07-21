export default (marker)=>{
    return fetch(`http://localhost:3001/${marker._id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
}