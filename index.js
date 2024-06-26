const express = require('express')
const { connectDB } = require("./utils/mongoose")

const app = express()
app.use(express.json())

const {
    PORT,
    DB,
    VERSION,
    ROUTING_VERSION
} = require("./config/config")

// Connect to DB
connectDB(app, PORT, DB)

// Routes
const { playlists } = require(ROUTING_VERSION)
app.use(`${VERSION}playlists`, playlists)

const { tracks } = require(ROUTING_VERSION)
app.use(`${VERSION}tracks`, tracks)
