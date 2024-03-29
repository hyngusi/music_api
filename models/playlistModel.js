const { Schema, model } = require("mongoose")
const { schema } = require("./trackModel")

const playlistSchema = new Schema({
    id: {
        type: String,
        required: [true, "id is required"],
        trim: true,
    },
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        max: 200,
        min: 2
    },
    img: {
        type: String,
        required: [true, "img is required"],
        default: 'https://res.cloudinary.com/drghk9p6q/image/upload/v1674479864/Final-Project-MERN/images-orpheus/default-images/playlist_mcyltf.webp'
    },
    tracks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'track'
        }
    ]
}, { timestamps: true })

module.exports = model('playlist', playlistSchema)