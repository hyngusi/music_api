const mongoose = require("mongoose")
const { Track, Playlist } = require("../models")

const tracksController = {
    getAllTracks: async (req, res) => {
        try {
            const tracks = await Track
                .find({})
                .populate('playlists')
                .lean()

            res.status(200).send(tracks)
        } catch (err) {
            res.status(500).send(err.message)
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

            res.status(200).send(track)
        } catch (err) {
            res.status(500).send(err.message)
        }
    },

    postNewTrack: async (req, res) => {
        const tracks = req.body; // Đầu vào là một danh sách các bài hát
        try {
            for (const track of tracks) {
                const trackExist = await Track.findOne({ id: track.id });

                if (trackExist) {
                    console.log(`Track with id ${track.id} already exists, skipping...`);
                } else {
                    const newTrack = await Track.create(track);
                    console.log(`Track with id ${track.id} created successfully`);
                }
            }

            res.status(200).send({
                status: "Creadted",
            })
        } catch (err) {
            res.status(500).send(err.message)
        }
    },

    deleteOneTrack: async (req, res) => {
        const id = req.params.id

        try {
            const track = await Track.findOneAndDelete({ id: id })

            if (!track) {
                return res.status(404).send({
                    status: "False",
                    message: `Track ${id} was not found`
                })
            }
            res.status(204).send({ status: "Deleted" })
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
}

// module.exports = {
//     getAllTracks: tracksController.getAllTracks,
//     getTrackById: tracksController.getTrackById,
//     postNewTrack: tracksController.postNewTrack,
// }

module.exports = tracksController