import { nanoid } from "nanoid";
import deleteTripRequest from "../api/deleteTripRequest";
import {useQueryClient, useMutation} from "react-query";
import { useState } from "react";
import "./styles/dashboard.css"


export default function DestinationList({ trips, isLoading, user, generateTripDash}){
    const queryClient = useQueryClient();

    
    const {mutate: deleteTrip} = useMutation(
        (tripToDelete)=>deleteTripRequest(tripToDelete),{
            onSettled: ()=>{
                queryClient.invalidateQueries("trips")
            }
        }
    )
    const [listOpen, setListOpen] = useState(false)
    const setList = () =>{
        setListOpen(!listOpen)
        if(listOpen){
            setButton("My Journeys")
        }else{
            setButton("Close TripList")
        }
    }

    const handleCountryDelete = (location) => {
        trips.map((trip)=>{
            if(trip.tripLocation == location && trip.username == user){
                deleteTrip(trip)
                return;
            }
        })
    }

    const [isHovering, setIsHovering] = useState(false)
    const [currentHover, setCurrentHover] = useState(null)
     
    const handleMouseOver = (trip) =>{
        setIsHovering(true)
        setCurrentHover(trip)
    }

    const handleMouseOut = () =>{
        setIsHovering(false)
        console.log("OK")
    }

    const [button, setButton] = useState("My Journeys")
            
    return(
        <div className="dash">
            <button onClick={setList} className="trip-button">{button}</button>
            {listOpen && 
            <div className="tripArray" onMouseOut={handleMouseOut}>
            {!isLoading && trips.map((trip)=>(
                <div key={nanoid()} className="tripBox" onMouseOver={()=>handleMouseOver(trip)}>
                    {trip.tripLocation} {trip.start.slice(0,4)}
                    {isHovering && currentHover.tripLocation === trip.tripLocation &&
                        <div className="buttons">
                            <button onClick={()=>{handleCountryDelete(trip.tripLocation)}} className="tripDeleteButton">Delete</button>
                            <button onClick={()=>{generateTripDash(trip)}}>View Trip</button>
                        </div>
                    }               
                </div>
            ))}
            </div>
            }
        </div>
    )
}