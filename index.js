const express = require('express')
const { connectDB } = require("./utils/mongoose")

const app = express()
const {
    PORT,
    DB,
    VERSION,
    ROUTING_VERSION
} = require("./config/config")

// Connect to DB
connectDB(app, PORT, DB)


