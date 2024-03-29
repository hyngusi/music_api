const express = require("express")
const router = express.Router()

const {
    getAllTracks,
    getTrackById,
    postNewTrack,
    deleteOneTrack,
    patchOneTrack
} = require("../../controllers/tracksController")

router
    .get("/", getAllTracks)
    .get("/:id", getTrackById)
    .post("/", postNewTrack)
// .delete("/:id", deleteOneTrack)
// .patch("/:id", patchOneTrack)

module.exports = router