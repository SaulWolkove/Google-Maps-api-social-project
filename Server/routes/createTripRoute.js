const TripModel = require("../models/tripModel")

module.exports = async (req, res) =>{
    const {markerLat}=req.body
    const {markerLng}=req.body
    const {tripLocation}=req.body
    const {start}=req.body
    const {end}=req.body
    const {caption}=req.body
    const {username}=req.body
    const {poi}=req.body
    const trip = new TripModel({
        tripLocation,
        markerLat,
        markerLng,
        start,
        end,
        caption,
        username,
        poi
        
        
    })
    const newTrip = await trip.save();
    res.json(newTrip);
}