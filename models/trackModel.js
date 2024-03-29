const { Schema, model } = require("mongoose")

const trackSchema = new Schema({
    id: {
        type: String,
        required: [true, "the id of the song is required"]
    },
    name: {
        type: String,
        required: [true, "the name of the song is required"],
        trim: true
    },
    img: {
        type: String,
        // required: [true, "img is required"],
        default: "https://res.cloudinary.com/drghk9p6q/image/upload/v1674479861/Final-Project-MERN/images-orpheus/default-images/track_okeksf.webp"
    },
    url: {
        type: String,
        // required: [true, "the url is required"]
    },
    playlists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'playlist'
        }
    ]
}, { timestamps: true })

module.exports = model('track', trackSchema)