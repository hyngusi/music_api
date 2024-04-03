const express = require("express")
const router = express.Router()

const {
    getAllTracks,
    getTrackById,
    postNewTrack,
    deleteOneTrack,
    patchTrack
} = require("../../controllers/tracksController")

router
    .get("/", getAllTracks)
    .get("/:id", getTrackById)
    .post("/", postNewTrack)
    // .delete("/:id", deleteOneTrack)
    .patch("/", patchTrack)

module.exports = router