const mongoose = require("mongoose")

const markerSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number, 
    country: String,
    start: String,
    end: String,
    caption: String,
})

const MarkerModel = mongoose.model("Marker", markerSchema);

module.exports = MarkerModel