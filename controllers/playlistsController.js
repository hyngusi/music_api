const mongoose = require("mongoose")
const { Playlist } = require("../models")

const playlistController = {
    getAllPlaylists: async (req, res) => {
        try {
            const playlists = await Playlist
                .find({})
                .populate("tracks")
                .lean()

            if (playlists.length < 1) {
                return res.status(404).send({
                    status: "False",
                    message: "The DB id currently empty"
                })
            }
            res.status(200).send(playlists)
        } catch (err) {
            res.status(400).send(err)
        }
    }
}

module.exports = {
    getAllPlaylists: playlistController.getAllPlaylists
}