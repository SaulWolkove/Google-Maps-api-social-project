
export default ({name, handleCountryDelete}) =>{
    return(
    <div>
        <h1>{name}</h1>
        <button onClick={()=>handleCountryDelete(name)}>Delete</button>
    </div>
    )
}