const MarkerModel = require("../models/markerModel")

module.exports = async (req, res) =>{
    const {latitude}=req.body
    const{longitude}=req.body
    const {country}=req.body
    const {start}=req.body
    const {end}=req.body
    const {caption}=req.body
    const marker = new MarkerModel({
        latitude,
        longitude,
        country,
        start,
        end,
        caption
        
        
    })
    const newMarker = await marker.save();
    res.json(newMarker);
}