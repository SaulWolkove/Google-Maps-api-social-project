export default function ControlCenter(){

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
)}