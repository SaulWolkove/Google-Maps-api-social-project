const express = require("express");


const router = express.Router();

const readMarkersRoute = require("./routes/readMarkerRoute")
const createMarkerRoute = require("./routes/createMarkerRoute")
const deleteMarkerRoute = require("./routes/deleteMarkerRoute")


router.get("/", readMarkersRoute);
router.post("/", createMarkerRoute);
router.delete("/:id", deleteMarkerRoute)


module.exports = router