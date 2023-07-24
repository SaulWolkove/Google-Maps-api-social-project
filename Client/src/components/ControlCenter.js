import PlaceItem from "./PlaceItem";
import { nanoid } from "nanoid";
import Places from "./Places";
import addMarkerRequest from "../api/addMarkerRequest";
import deleteMarkerRequest from "../api/deleteMarkerRequest";
import {useQueryClient, useMutation} from "react-query";



export default function ControlCenter({mapRef, markers, isLoading}){

    const queryClient = useQueryClient();

    const {mutate: addMarker} = useMutation(
        (newMarker)=>addMarkerRequest(newMarker),{
            onSettled: ()=>{
                queryClient.invalidateQueries("markers")
            }
        }
    )

    const {mutate: deleteMarker} = useMutation(
        (markerToDelete)=>deleteMarkerRequest(markerToDelete),{
            onSettled: ()=>{
                queryClient.invalidateQueries("markers")
            }
        }
    )

    
        



    return(
        <div>
            <div className="addingPanel">
            <Places setLocation={(position, country, start, end, caption)=>{
                mapRef.current?.panTo(position);
                mapRef.current?.setZoom(4);
                let newMarker = {latLngLit: position, markerCountry:country, startDate: start, endDate: end, caption: caption}
                addMarker(newMarker)
            }}/>
            </div>
            <div className="countriesPanel">
            {!isLoading && markers.map((marker)=>(
                <PlaceItem name={marker.country} 
                handleCountryDelete={(country) => {
                markers.map((marker)=>{
                    if(marker.country == country){
                    deleteMarker(marker)
                    return;
                    }
                })
                }} 
                key={nanoid()}/>
            ))}
            </div>
        </div>
    )
}