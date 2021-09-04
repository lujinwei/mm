import request from "./http";
// /toplist

// 获取手机验证码 /captcha/sent?phone=13xxx
export function getCaptcha(params){
    console.log(params);
    return request({
        url:'/captcha/sent',
        method:"get",
        params
    })
}

// 通过code 手机验证码验证 /captcha/verify?phone=13xxx&captcha=1597
export function getCaptchaVerify(params){
    return request({
        url:'/captcha/verify',
        method:"get",
        params
    })
}
// 手机密码登录 /login/cellphone?phone=xxx&password=yyy /login/cellphone?phone=xxx&md5_password=yyy
export function login(params){
    // console.log(params);
    return request({
        url:"/login/cellphone",
        method:"get",
        params
    })
}

// 获取用户信息  /user/detail?uid=3958329393
export function getUserInfo(params){
    return request({
        url:"/user/detail",
        method:"get",
        params
    })
}

// 获取用户账号信息  /user/account
export function getUserAcount(params){
    return request({
        url:"/user/account",
        method:"get",
        params
    })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量 /user/subcount
export function getUserSubcount(params){
    return request({
        url:"/user/subcount",
        method:"get",
        params
    })
}

// /like?id=347230
// like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
export function sendlikemisic(params){
    return request({
        url:"/like",
        method:"get",
        params
    })
}
// 传入用户 id, 可获取已喜欢音乐id列表(id数组) /likelist?uid=32953014
export function getLikelist(params){
    return request({
        url:"/likelist",
        method:"get",
        params
    })
}
// 获取用户播放记录  /user/record?uid=32953014&type=1
export function getUserRecord(params){
    return request({
        url:"/user/record",
        method:"get",
        params
    })
}

// 获取已收藏专辑列表  /album/sublist
export function getAlbumSublist(params){
    return request({
        url:"/album/sublist",
        method:"get",
        params
    })
}

// 更新用户信息 
    // gender: 性别 0:保密 1:男性 2:女性
    // birthday: 出生日期,时间戳 unix timestamp
    // nickname: 用户昵称
    // province: 省份id
    // city: 城市id
    // signature：用户签名
// /user/update?gender=0&signature=测试签名&city=440300&nickname=binary&birthday=1525918298004&province=440000
export function updataUser(params){
    return request({
        url:"/user/update",
        method:"get",
        params
    })
}
// export function editNiCheng(params){
//     return request({
//         url:"/user/update",
//         method:"get",
//         params
//     })
// }
// 用户歌单  /user/playlist

// 更改用户头像
export function setUserIcon(params,formData){
    return request({
        url:"/user/update",
        method:'post',
        params,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
    })
}

