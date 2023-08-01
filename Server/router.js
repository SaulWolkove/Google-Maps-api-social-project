const express = require("express");


const router = express.Router();

const readMarkersRoute = require("./routes/readMarkerRoute")
const createMarkerRoute = require("./routes/createMarkerRoute")
const deleteMarkerRoute = require("./routes/deleteMarkerRoute");
const {registerUser, authUser} = require("./controllers/userControllers");

router.get("/", readMarkersRoute);
router.post("/", createMarkerRoute);
router.delete("/:id", deleteMarkerRoute)
router.post("/register", registerUser)
router.post("/login", authUser)

module.exports = router