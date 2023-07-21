const MarkerModel = require("../models/markerModel")

module.exports = async (req,res)=>{
    const markers = await MarkerModel.find();
    res.json(markers);
}