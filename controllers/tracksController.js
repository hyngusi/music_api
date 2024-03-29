const mongoose = require("mongoose")
const { Track, Playlist } = require("../models")

const tracksController = {
    getAllTracks: async (req, res) => {
        try {
            const tracks = await Track
                .find({})
                .populate('playlist')
                .lean()

            res.status(200).send(tracks)
        } catch (err) {
            res.status(400).send(err.message)
        }
    },

    getTrackById: async (req, res) => {
        const id = req.params.id

        try {
            const track = await Track
                .findOne({ id: id })
                .populate("playlists")
                .lean()

            if (!track) {
                return res.status(404).send({
                    status: "False",
                    message: `Track ${id} was not found`
                })
            }
        } catch (err) {
            res.status(400).send(err.message)
        }
    },

    postNewTrack: async (req, res) => {
        const body = req.body[0]
        console.log(body.id)
        try {
            const trackExist = await Track.findOne({ id: body.id })
            if (trackExist) {
                return res.status(400).send({
                    status: "False",
                    message: "This track already exists"
                })
            }

            const newTrack = await Track.create(body)

            res.status(201).send({
                status: "Creadted",
                data: newTrack
            })
        } catch (err) {
            res.status(400).send(err.message)
        }
    },


}

module.exports = {
    getAllTracks: tracksController.getAllTracks,
    getTrackById: tracksController.getTrackById,
    postNewTrack: tracksController.postNewTrack,
}