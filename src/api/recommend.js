import request from "./http";
// http://127.0.0.1:3000/banner?type=3

// 获取轮播图数据
export function getBanner(){
    return request({
        url:"/banner?type=3",
        method:"get"
    })
}
// 获取推荐歌单数据
export function getRecommend(){
    return request({
        url:"/personalized?limit=9",
        method:"get"
    })
}
// 获取热门歌手数据
export function getRecommendSinger(){
    return request({
        url:"/top/artists?offset=0&limit=10",
        method:"get",
    })
}
// 获取电台个性推荐数据
export function getRecommendStation(){
    return request({
        url:"/dj/personalize/recommend",
        method:"get",
        params:{
            limit:10,
        }
    })
}
// 获取新歌数据  /personalized/newsong
export function getNewsong(){
    return request({
        url:"/personalized/newsong",
        method:"get",
    })
}

// 获取最新专辑 /album/newest
export function getAlbumNewest(){
    return request({
        url:"/album/newest",
        method:"get",
    })
}