import { useQuery } from "react-query"
import readMarkerRequest from "../api/readMarkerRequest";


export default ()=>{
    const {isLoading, data: markers} = useQuery(
    'markers', 
    readMarkerRequest
    )



    var countryList = [];
    markers.map((marker)=>(
    countryList.push(marker.country)
    ))



    
    const CollectedImages = {
    "image1": require(`./UserImages/${countryList[0]}`),
    "image1": require(`./UserImages/${countryList[0]}`)

    }

}


