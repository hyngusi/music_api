const { ZingMp3 } = require("zingmp3-api-full")
const getTracks = require("./track-api")


const getPlaylists = async (req) => {
    let playlist = {};
    let listTracks = []
    try {
        const data = await ZingMp3.getDetailPlaylist(`"${req}"`);

        // id playlist
        playlist["id"] = data['data']['encodeId'];

        // name - title
        playlist["name"] = data['data']['title'];

        // description
        playlist["description"] = data['data']['description'];

        // img - thumbnail
        playlist["img"] = data['data']['thumbnail'];

        // tracks
        var tracks = data['data']['song']['items'].map(item => item['encodeId']); // ['1', '2']
        playlist["tracks"] = tracks;

        for (const track of tracks) {
            listTracks.push(await getTracks(track))
        }

    } catch (error) {
        console.error(error);
    }

    return [playlist, listTracks]
};

module.exports = getPlaylists