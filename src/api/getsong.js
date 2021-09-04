import request from "./http";
// /toplist

// 获取歌曲详情
// /song/detail?ids=1492584510
export function getSongDetail(params){
    return request({
        url:"/song/detail",
        method:"get",
        params
    })
}
// /song/url?id= url
export function getSong(params){
    return request({
        url:"/song/url",
        method:"get",
        params
    })
}

// 获取歌词  http://localhost:3000/lyric?id=33894312
export function getLyrics(params){
    return request({
        url:"/lyric",
        method:"get",
        params
    })
}