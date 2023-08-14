import PlaceItem from "./PlaceItem";
import { nanoid } from "nanoid";
import deleteTripRequest from "../api/deleteTripRequest";
import {useQueryClient, useMutation} from "react-query";
import { useState } from "react";



export default function DestinationList({ trips, isLoading, user}){
    const queryClient = useQueryClient();

    
    const {mutate: deleteTrip} = useMutation(
        (tripToDelete)=>deleteTripRequest(tripToDelete),{
            onSettled: ()=>{
                queryClient.invalidateQueries("trips")
            }
        }
    )
    const [listOpen, setListOpen] = useState(true)
    const setList = () =>{
        setListOpen(!listOpen)
    }
            
    return(
        <div>
            <button onClick={setList}>Look at Trips</button>
            {listOpen && 
            <div className="countriesPanel">
            {!isLoading && trips.map((trip)=>(
                <PlaceItem name={trip.tripLocation} 
                handleCountryDelete={(location) => {
                trips.map((trip)=>{
                    if(trip.tripLocation == location && trip.username == user){
                    deleteTrip(trip)
                    return;
                    }
                })
                }} 
                key={nanoid()}/>
            ))}
            </div>
            }
        </div>
    )
}