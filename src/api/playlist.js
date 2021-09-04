import request from "./http";
// /toplist

// 获取热门歌手
// /top/artists?offset=0&limit=30
export function hotPlaylist(params){
    return request({
        url:"/top/artists",
        method:"get",
        params
    })
}

// 获取歌手分类
// /artist/list?type=1&area=96&initial=b
export function playlist(params){
    return request({
        url:"/artist/list",
        method:"get",
        params
    })
}