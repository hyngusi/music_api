const { Schema, model } = require("mongoose")

const trackSchema = new Schema({
    id: {
        type: String,
        required: [true, "the id of the song is required"],
        unique: true
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
            type: Schema.Types.String,
            ref: 'playlist'
        }
    ]
}, { timestamps: true }, { _id: false })

// trackSchema.set('_id', false)
// trackSchema.set('validateBeforeSave', false);


module.exports = model('track', trackSchema)