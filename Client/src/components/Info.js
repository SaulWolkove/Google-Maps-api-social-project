
export default function Info(marker){
    const location = marker.marker.tripLocation;
    const start = marker.marker.start;
    const end = marker.marker.end;
    const caption = marker.marker.caption;

    let image
    try{
        image = require(`../UserImages/${location}/${location}.jpg`)
    } catch{
        image = require("../UserImages/download.jpg")
    }

    return(
        <div>
            {location}
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