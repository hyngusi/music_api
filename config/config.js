require("dotenv").config()

// DB connection
const PORT = process.env.PORT || 4000
const DB = process.env.MONGO_URI

// Endpoint Version 
const VERSION = "/api/v1/"
const ROUTING_VERSION = "./v1"

module.exports = {
    PORT,
    DB,
    VERSION,
    ROUTING_VERSION
}