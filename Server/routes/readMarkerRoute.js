const MarkerModel = require("../models/markerModel")

module.exports = async (req,res)=>{
    const username= req.query.username
    const markers = await MarkerModel.find({username: username});
    res.json(markers);
}