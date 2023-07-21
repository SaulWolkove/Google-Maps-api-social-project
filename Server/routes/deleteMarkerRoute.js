const MarkerModel = require("../models/markerModel")

module.exports = async (req,res)=>{
    const {id} = req.params;
    const marker = await MarkerModel.findById(id);
    await marker.deleteOne();
    res.status(204).json(marker);
}