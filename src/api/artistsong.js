import request from "./http";
// /toplist

// 获取热门歌手
// /artist/album?id=6452&limit=30    |/artist/songs
export function getArtistSong(params){
    return request({
        url:"/artist/songs",
        method:"get",
        params
    })
}

export function getArtistData(params){
    return request({
        url:"/artists",
        method:"get",
        params
    })
}