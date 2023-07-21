export default (newMarker)=>{
    return fetch(`http://localhost:3001`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            latitude: newMarker.latLngLit.lat,
            longitude: newMarker.latLngLit.lng,
            country: newMarker.markerCountry,
            start: newMarker.startDate,
            end: newMarker.endDate,
            caption: newMarker.caption
        })
    })
    .then(response=>response.json())
}