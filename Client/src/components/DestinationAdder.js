import { useQueryClient, useMutation } from "react-query";
import addMarkerRequest from "../api/addMarkerRequest";
import Places from "./Places";
import { useState } from "react";
import "./styles/dashboard.css"

export default function DestinationAdder({mapRef, user}){

    const queryClient = useQueryClient();

    const {mutate: addTrip} = useMutation(
        (newTrip)=>addMarkerRequest(newTrip),{
            onSettled: ()=>{
                queryClient.invalidateQueries("trips")
            }
        }
    )
    const [formOpen, setFormOpen] = useState(false)

    const setForm = () =>{
        if (formOpen){
            setMessage("Add A Destination")
        }else{
            setMessage("Close TripAdder")
        }
        setFormOpen(!formOpen)
        
    }

    const [message, setMessage] = useState("Add A Destination")


    return(
        <div>
            <button onClick={setForm} className="add-button">{message}</button>
            {formOpen && 
            <div className="adding-panel">
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