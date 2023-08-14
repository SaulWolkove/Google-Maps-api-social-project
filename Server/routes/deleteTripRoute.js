const TripModel = require("../models/tripModel")

module.exports = async (req,res)=>{
    const {id} = req.params;
    const marker = await TripModel.findById(id);
    await marker.deleteOne();
    res.status(204).json(marker);
}