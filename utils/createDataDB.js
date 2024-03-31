const mongoose = require('mongoose');
const axios = require('axios')
const { DB } = require('../config/config');
const getPlaylists = require("./playlist-api")
const getTracks = require("./track-api")


const playlistId = ['ZWZB969E', 'ZWZB96AB', 'ZWZB96DC', 'ZWZB96AI', 'ZWZB96DF', 'ZUDW9B78'];

let playlists = [];
(async () => {
    connectPrimaryDB()
    let playlist
    for (const id of playlistId) {
        playlist = await getPlaylists(id)

        playlists.push(playlist[0])

        await postTracksToAPI(playlist[1])
    }

    await postPlaylistToAPI(playlists)

    mongoose.disconnect()
        .then(() => {
            console.log('Disconnected from MongoDB');
        })
        .catch((err) => {
            console.error('Error disconnecting from MongoDB:', err);
        });
})();

async function connectPrimaryDB() {
    try {
        await mongoose.connect(DB);
        console.log('Update MongoDB connected');
    } catch (error) {
        console.error('Error connecting to update MongoDB:', error);
        process.exit(1);
    }
};

async function postPlaylistToAPI(playlistData) {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/playlists', playlistData);
        console.log('Playlist posted successfully:', response.data);
    } catch (error) {
        console.error('Error posting playlist:', error.message);
    }
}

async function postTracksToAPI(tracksData) {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/tracks', tracksData);
        console.log('Tracks posted successfully:', response.data)
    } catch (err) {
        console.error('Error posting tracks:', err.message)
    }
}