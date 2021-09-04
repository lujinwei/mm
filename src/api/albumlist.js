import request from "./http";
// /toplist
// 获取专辑内容 /album?id=32311
export function getAlbum(params){
    return request({
        url:"/album",
        method:"get",
        params
    })
}

// 获取评论内容  /comment/album?id=32311
export function getAlbumComment(params){
    return request({
        url:"/comment/album",
        method:"get",
        params
    })
}
// 点赞 /comment/like?type=6&cid=1419532712&threadId=A_EV_2_6559519868_32953014&t=0
// /comment/like?id=29178366&cid=12840183&t=1&type=0 t : 是否点赞 ,1 为点赞 ,0 为取消点赞
export function sendCommentLike(params){
    return request({
        url:"/comment/like",
        method:"get",
        params
    })
}


//传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数 /album/detail/dynamic?id=
export function getAlbumOtherInfo(params){
    return request({
        url:"/album/detail/dynamic",
        method:"get",
        params
    })
}

// t : 1 为收藏,其他为取消收藏
// 接口地址 : /album/sub
// id : 专辑 id 调用例子 : /album/sub?t=1 /album/sub?t=0

export function albumSub(params){
    return request({
        url:"/album/sub",
        method:"get",
        params
    })
}

// /comment?t=1&type=1&id=5436712&content=test (往广岛之恋 mv 发送评论: test)
// id:对应资源 id
// content :要发送的内容
// commentId :回复的评论id (回复评论时必填)
// t:1 发送, 2 回复
// type:3,为专辑
export function sendComment(params){
    return request({
        url:"/comment",
        method:"get",
        params
    })
}
