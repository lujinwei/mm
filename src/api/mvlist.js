import request from "./http";
// /toplist

// 获取mv列表数据
// 获取mv视频
export function getMvList(params){
    return request({
        url:'/mv/exclusive/rcmd',
        method:"get",
        params
    })
}


// /mv/url?id=5436712 /mv/url?id=10896407&r=1080
export function getMvUrl(params){
    return request({
        url:"/mv/url",
        method:"get",
        params
    })
}

// 获取mv详情 /mv/detail?mvid=5436712
export function getMvDetail(params){
    return request({
        url:"/mv/detail",
        method:"get",
        params
    })
}
// 获取评论  /comment/mv?id=5436712
export function getMvComment(params){
    return request({
        url:"/comment/mv",
        method:"get",
        params
    })
}


