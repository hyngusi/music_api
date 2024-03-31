const { ZingMp3 } = require("zingmp3-api-full")


const getTracks = async (req) => {
    let result = {};
    try {
        const data = await ZingMp3.getInfoSong(`"${req}"`);
        const id = data['data']['encodeId'];
        const link = await ZingMp3.getSong(id);

        if (link['msg'] == 'Success') {
            result['id'] = id;
            result['name'] = escapeQuotesInMiddle(data['data']['title']);
            result['artistsName'] = data['data']['artistsNames'];
            result['img'] = data['data']['thumbnail'];
            result['url'] = link['data']['128'];
        } else {
            return
        }
    } catch (error) {
        console.error(error);
    }
    return result
};

// getTracks("Z7UUAFUF")

function escapeQuotesInMiddle(input) {
    // Tìm tất cả các cặp dấu ngoặc kép ở giữa trong chuỗi và thêm dấu gạch chéo ngược vào trước chúng
    return input.replace(/(?<=\(.*)"(.*)"(?=.*\))/g, '\\"$1\\"');
}

module.exports = getTracks