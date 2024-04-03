const mongoose = require('mongoose');
const axios = require('axios')
const { DB } = require('../config/config');
const getPlaylists = require("./playlist-api")
const { connectCrudDB } = require("./mongoose")
const { disconnectDB } = require("./mongoose")

const { ZingMp3 } = require("zingmp3-api-full")
const getTrack = require("./track-api")

const playlistId = ['ZWZB969E'];
//, 'ZWZB96AB', 'ZWZB96DC', 'ZWZB96AI', 'ZWZB96DF', 'ZUDW9B78'

let playlists = [];
(async () => {
    connectCrudDB(DB)
    let playlist
    for (const id of playlistId) {
        // playlist = await getPlaylists(id)

        const track = await getTrack("Z7U00WDE")
        await patchTracksToAPI(track)
        // playlists.push(playlist[0])

        // await patchTracksToAPI(playlist[1])
    }

    // await patchPlaylistToAPI(playlists)

    disconnectDB()
})();

async function patchPlaylistToAPI(playlistData) {
    try {
        const response = await axios.patch('http://localhost:8080/api/v1/playlists', playlistData);
        console.log('Playlist posted successfully:', response.data);
    } catch (error) {
        console.error('Error posting playlist:', error.message);
    }
}

async function patchTracksToAPI(tracksData) {
    try {
        const response = await axios.patch('http://localhost:8080/api/v1/tracks', tracksData);
        console.log('Tracks posted successfully:', response.data)
    } catch (err) {
        console.error('Error posting tracks:', err.message)
    }
}