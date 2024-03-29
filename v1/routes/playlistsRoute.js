const express = require("express")
const router = express.Router()

const {
    getAllPlaylists,
    getPlaylistById,
    postPlaylist,
    deletePlaylist,
    patchPlaylist
} = require("../../controllers/playlistsController")


router
    .get("/", getAllPlaylists)
    .get("/:id", getPlaylistById)
    .post("/", postPlaylist)
    .delete("/:id", deletePlaylist)
    .patch("/:id", patchPlaylist)

module.exports = router