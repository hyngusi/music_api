const mongoose = require("mongoose")
const { Playlist } = require("../models")

const playlistController = {
    getAllPlaylists: async (req, res) => {
        try {
            const playlists = await Playlist
                .find({})
                .populate({
                    path: "tracks",
                    foreignField: 'id'
                })
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
        const id = req.params.id

        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(404).send({
        //         status: "FALSE",
        //         message: `${id} is an invalid ID`
        //     })
        // }

        try {
            const playlist = await Playlist
                .findOne({ id: id })
                .populate({
                    path: "tracks"
                })
                .lean()

            if (!playlist) {
                return res.status(404).send({
                    status: "False",
                    message: `Playlist ${id} was not found`
                })
            }

            res.status(200).send(playlist)
        } catch (err) {
            res.status(400).send(err.message)
        }
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

    deletePlaylist: async (req, res) => {
        const id = req.params.id

        try {
            const playlist = await Playlist.findOneAndDelete({ id: id })

            if (!playlist) {
                res.status(404).send({
                    status: "False",
                    message: `Playlist ${id} was not found`
                })
            }

            res.status(200).send({
                status: "Deleted",
                data: playlist
            })
        } catch (err) {
            res.status(400).send(err.message)
        }
    }
}

module.exports = {
    getAllPlaylists: playlistController.getAllPlaylists,
    getPlaylistById: playlistController.getPlaylistById,
    postPlaylist: playlistController.postPlaylist,
    deletePlaylist: playlistController.deletePlaylist
}