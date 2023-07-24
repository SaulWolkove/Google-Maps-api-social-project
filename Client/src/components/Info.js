
export default function Info({country, start, end, caption}){

    let image
    try{
        image = require(`../UserImages/${country}/${country}.jpg`)
    } catch{
        image = require("../UserImages/download.jpg")
    }

    return(
        <div>
            {country}
            <br>
            </br>
            {start} - {end}
            <br/>
            {caption}
            <img src={image} width={"200px"} 
            />

        </div>
    )

}