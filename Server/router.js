const express = require("express");


const router = express.Router();

const readTripsRoute = require("./routes/readTripsRoute")
//const createMarkerRoute = require("./routes/createMarkerRoute")
const deleteTripRoute = require("./routes/deleteTripRoute");
const {registerUser, authUser} = require("./controllers/userControllers");
const createTripRoute = require("./routes/createTripRoute")

router.get("/", readTripsRoute);
//router.post("/", createMarkerRoute);
router.post("/", createTripRoute)
router.delete("/:id", deleteTripRoute)
router.post("/register", registerUser)
router.post("/login", authUser)

module.exports = router