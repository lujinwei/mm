import request from "./http";
// /toplist

// 获取排行榜数据
export function getToplist(){
    return request({
        url:"/toplist",
        method:"get"
    })
}
// 获取排行榜详情数据 /playlist/detail?id=19723756
export function getplaylistDetail(params){
    return request({
        url:"/playlist/detail",
        method:"get",
        params
    })
}

