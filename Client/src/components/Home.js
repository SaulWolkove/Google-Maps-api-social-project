import {useLoadScript, GoogleMap, MarkerF} from "@react-google-maps/api";
import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import {useQuery} from "react-query";
import "./styles/map.css"
import Places from "./Places"
import readMarkerRequest from "../api/readMarkerRequest";
import { library } from "../config";
import addMarkerRequest from "../api/addMarkerRequest";
import {useMutation, useQueryClient} from "react-query";
import deleteMarkerRequest from "../api/deleteMarkerRequest";
import PlaceItem from "./PlaceItem";
import {nanoid} from "nanoid";
import Info from "./Info";

export default function Home() {
  const mapRef = useRef(3);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: library,
  });

  const {isLoading, data: markers} = useQuery(
    'markers', 
    readMarkerRequest
    )

  const center = useMemo(() => ({ lat: 24.52043, lng: 15.856743 }), []);
  const options = useMemo(()=> ({
    disableDefaultUI: true,
    clickableIcons: false,
    mapId: "5c60bef575d03ff",})
    ,[])

 //ok
  const queryClient = useQueryClient();

  const {mutate: addMarker} = useMutation(
      (newMarker)=>addMarkerRequest(newMarker),
      {
        onSettled: ()=>{
          queryClient.invalidateQueries("markers")
        }
      }
  )

  const {mutate: deleteMarker} = useMutation(
    (markerToDelete)=>deleteMarkerRequest(markerToDelete),
    {
      onSettled: ()=>{
        queryClient.invalidateQueries("markers")
      }
    }
)
  const onLoad = useCallback((map)=>(mapRef.current = map), []);

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver = (marker) => {
    setIsHovering(true)
    setObservedMarker(marker)
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
          <div className="control">
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
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={3}
          options={options}
          onLoad={onLoad}
          > 
            {!isLoading && markers.map((marker)=>(
              <MarkerF position={{lat: marker.latitude,lng: marker.longitude}} key={marker._id} onMouseOver={()=>handleMouseOver(marker)} onMouseOut={handleMouseOut}/>
              
            ))}
        </GoogleMap>
        {isHovering && (
          <div style={{"position":"absolute","top":(coords.y+100),"left":coords.x-100,"background":"white"}}>
            <Info country={observedMarker.country} start={observedMarker.start} end={observedMarker.end} caption={observedMarker.caption}/>
          </div>
        )}
        

        </div>
        
      )}
    </div>
  );
};

