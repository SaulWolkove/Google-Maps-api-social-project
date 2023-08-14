import { useQueryClient, useMutation } from "react-query";
import addMarkerRequest from "../api/addMarkerRequest";
import Places from "./Places";
import { useState } from "react";

export default function DestinationAdder({mapRef, user}){

    const queryClient = useQueryClient();

    const {mutate: addTrip} = useMutation(
        (newTrip)=>addMarkerRequest(newTrip),{
            onSettled: ()=>{
                queryClient.invalidateQueries("trips")
            }
        }
    )
    const [formOpen, setFormOpen] = useState(true)

    const setForm = () =>{
        setFormOpen(!formOpen)
    }
    return(
        <div>
            <button onClick={setForm}>Add A Destination</button>
            {formOpen && 
            <div className="addingPanel">
                <Places 
                user={user}
                setLocation={(position, country, start, end, caption, user, poi)=>{
                    mapRef.current?.panTo(position);
                    mapRef.current?.setZoom(4);
                    let newTrip = {latLngLit: position, markerCountry:country, startDate: start, endDate: end, caption: caption, username: user, poi: poi}
                    addTrip(newTrip)
                }}/>
            </div>
            }
        </div>
    )
}