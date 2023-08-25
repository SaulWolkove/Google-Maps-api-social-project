import {useLoadScript, GoogleMap, MarkerF} from "@react-google-maps/api";
import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import {useQuery} from "react-query";
import { nanoid } from "nanoid";
import "./styles/map.css"
import readTripRequest from "../api/readTripRequest";
import { library } from "../config";
import Info from "./Info";
import DestinationAdder from "./DestinationAdder";
import DestinationList from "./DestinationList";
import TripDash from "./TripDash";
import tripImage from "../assets/tripIcon.png"


export default function Home() {
  const user = (localStorage.getItem("user"))
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: library,
  });
  const {isLoading, data: trips} = useQuery(
    ['trips', user],
    (user)=>readTripRequest(user)
    )

  const center = useMemo(() => ({ lat: 24.52043, lng: 15.856743 }), []);

  const bounds = {
    south: -85,
    west: -175,
    north: 85,
    east: 175
  }

  const options = useMemo(()=> ({
    disableDefaultUI: true,
    clickableIcons: false,
    mapId: "5c60bef575d03ff",
    minZoom: 2.5,
    restriction: {
      latLngBounds: bounds
    }
    }),[]
  )

  const mapRef = useRef(3);
  const onLoad = useCallback((map)=>(mapRef.current = map), []);

  const [isHovering, setIsHovering] = useState(false)
  const [coords, setCoords] = useState({x:0,y:0})
  const [observedMarker, setObservedMarker] = useState()

  const handleMouseOver = (e,trip) => {
    setIsHovering(true)
    setObservedMarker(trip)
    setCoords({
      x: e.domEvent.clientX,
      y: e.domEvent.clientY,
    })
  }
  const handleMouseOut = () => {
    setIsHovering(false)
  }


  const [tripDashBool, setTripDashBool] = useState(false)
  const generateTripDash = (trip) => {
    handleMouseOut()
    setTripDashBool(true)
    mapRef.current?.setZoom(5)

    mapRef.current?.panTo({lat: trip.markerLat,lng:trip.markerLng})
  }

  const removeTripDash = () => {
    setTripDashBool(false)
    mapRef.current?.setZoom(3)
  }

  return (
    <div style={{"position":"relative"}}>
      {!isLoaded || isLoading ? (
        <h1>Loading...</h1>
      ) : (
        
        <div className="container" >
          {!tripDashBool && <DestinationAdder mapRef={mapRef} user={user}/>}
          {!tripDashBool && <DestinationList trips={trips} isLoading={isLoading} user={user} generateTripDash={generateTripDash} className="trip-adding-panel"/>}
          {tripDashBool && <TripDash trip={observedMarker} removeTripDash={removeTripDash}/>}
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={3}
            options={options}
            onLoad={onLoad}
            > 
              {!tripDashBool && !isLoading && trips.map((trip)=>(
                <MarkerF 
                  position={{lat: trip.markerLat,lng: trip.markerLng}} 
                  key={trip._id}
                  onMouseOver={(event)=>handleMouseOver(event,trip)} 
                  onMouseOut={handleMouseOut} 
                  onClick={()=>generateTripDash(trip)} 
                  icon={tripImage}/>
                
              ))}
            {tripDashBool && observedMarker.poi.map((marker)=>(
                <MarkerF key={nanoid()} position={{lat:marker.lat,lng:marker.lng}}/>
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

