import {useLoadScript, GoogleMap, MarkerF} from "@react-google-maps/api";
import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import {useQuery} from "react-query";
import "./styles/map.css"
import readTripRequest from "../api/readTripRequest";
import { library } from "../config";
import Info from "./Info";
import DestinationAdder from "./DestinationAdder";
import DestinationList from "./DestinationList";


export default function Home() {
  const user = (localStorage.getItem("user"))
  const mapRef = useRef(3);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: library,
  });
  const {isLoading, data: trips} = useQuery(
    ['trips', user],
    (user)=>readTripRequest(user)
    )

  const center = useMemo(() => ({ lat: 24.52043, lng: 15.856743 }), []);
  const options = useMemo(()=> ({
    disableDefaultUI: true,
    clickableIcons: false,
    mapId: "5c60bef575d03ff",})
    ,[])

  
 
  const onLoad = useCallback((map)=>(mapRef.current = map), []);

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver = (trip) => {
    setIsHovering(true)
    setObservedMarker(trip)
  }
  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const [coords, setCoords] = useState({x:0,y:0})


    const handleWindowMouseMove = (event) =>{
      setCoords({
        x: event.clientX,
        y: event.clientY,
      })
    }
  
  
  window.addEventListener("mousemove", handleWindowMouseMove)

  const [observedMarker, setObservedMarker] = useState()
  return (
    <div style={{"position":"relative"}}>
      {!isLoaded && isLoading ? (
        <h1>Loading...</h1>
      ) : (
        
        <div className="container">
          <DestinationAdder mapRef={mapRef} user={user}/>
          <DestinationList trips={trips} isLoading={isLoading} user={user}/>
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={3}
            options={options}
            onLoad={onLoad}
            > 
              {!isLoading && trips.map((trip)=>(
                <MarkerF position={{lat: trip.markerLat,lng: trip.markerLng}} key={trip._id} onMouseOver={()=>handleMouseOver(trip)} onMouseOut={handleMouseOut}/>
                
              ))}
          </GoogleMap>
          {isHovering && (
            <div style={{"position":"absolute","top":(coords.y+100),"left":coords.x-100,"background":"white"}}>
              <Info marker={observedMarker}/>
            </div>
          )}
        </div>
        
      )}
    </div>
  );
};

