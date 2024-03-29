const express = require("express")
const router = express.Router()

const {
    getAllTracks,
    getOneTrack,
    postNewTrack,
    deleteOneTrack,
    patchOneTrack
} = require("../../controllers/tracksController")

router
// .get("/", getAllTracks)
// .get("/:id", getOneTrack)
// .post("/", postNewTrack)
// .delete("/:id", deleteOneTrack)
// .patch("/:id", patchOneTrack)

module.exports = router