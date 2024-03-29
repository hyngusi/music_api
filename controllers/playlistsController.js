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
            res.status(400).send(err.message)
        }
    },

    getPlaylistById: async (req, res) => {
        const { param: { id } } = req

        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(404).send({
        //         status: "FALSE",
        //         message: `${id} is an invalid ID`
        //     })
        // }


    },

    postPlaylist: async (req, res) => {
        const { body } = req

        try {
            // const playlistExist = await Playlist.findOne({ name: body.name })

            // if (playlistExist) {
            //     return res.status(400).send({
            //         status: "False",
            //         message: "Playlist already exist"
            //     })
            // }

            const playlist = await Playlist.create(body)

            res.status(201).send({
                status: "Created",
                data: {
                    playlist
                }
            })

        } catch (err) {
            res.status(400).send(err.message)
            console.log(err)
        }
    },


}

module.exports = {
    getAllPlaylists: playlistController.getAllPlaylists,
    postPlaylist: playlistController.postPlaylist
}