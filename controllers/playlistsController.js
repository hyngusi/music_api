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
            res.status(500).send(err.message)
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
                    path: "tracks",
                    foreignField: 'id'
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
            res.status(500).send(err.message)
        }
    },

    postPlaylist: async (req, res) => {
        const playlists = req.body

        try {
            for (const playlist of playlists) {
                const playlistExist = await Playlist.findOne({ id: playlist.id })

                if (playlistExist) {
                    console.log(`Playist with id ${playlist.id} already exists, skipping...`);
                } else {
                    const newPlaylist = await Playlist.create(playlist)
                    console.log(`Playlist with id ${playlist.id} created successfully`);
                }
            }

            res.status(200).send({
                status: "Created"
            })
        } catch (err) {
            res.status(500).send(err.message)
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
            res.status(500).send(err.message)
        }
    }
}

module.exports = playlistController