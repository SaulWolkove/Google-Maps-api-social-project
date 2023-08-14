export default (newTrip)=>{
    return fetch(`http://localhost:3001`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tripLocation: newTrip.markerCountry,
            markerLat: newTrip.latLngLit.lat,
            markerLng: newTrip.latLngLit.lng,
            start: newTrip.startDate,
            end: newTrip.endDate,
            caption: newTrip.caption,
            username: newTrip.username,
            poi: newTrip.poi
        })
    })
    .then(response=>response.json())
}