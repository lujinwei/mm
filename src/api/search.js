import request from "./http";

// 热门搜索
export function getHotSearchData(){
    return request({
        url:"/search/hot",
        method:"get"
    })
}
// 搜索建议 /search/suggest?keywords= 海阔天空 /search/suggest?keywords= 海阔天空&type=mobile
export function getSuggestSearchData(params){
    return request({
        url:"/search/suggest",
        method:"get",
        params
    })
}
// /cloudsearch?keywords= 海阔天空
export function getSearchData(params){
    return request({
        url:"/cloudsearch",
        method:"get",
        params
    })
}