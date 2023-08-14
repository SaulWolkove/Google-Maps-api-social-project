const TripModel = require("../models/tripModel")

module.exports = async (req,res)=>{
    const username= req.query.username
    const trips = await TripModel.find({username: username});
    res.json(trips);
}