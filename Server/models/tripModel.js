const mongoose = require("mongoose")

const tripSchema = new mongoose.Schema({
    tripLocation: String,
    markerLat: Number,
    markerLng: Number,
    start: String,
    end: String,
    caption: String,
    username: String,
    poi: Array
})

const MarkerModel = mongoose.model("Trip", tripSchema);

module.exports = MarkerModel