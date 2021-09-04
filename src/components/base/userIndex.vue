<template>
    <div>
        <div class="my-header">
            <div class="goback" @click="$router.go(-1)">
                <span class="iconfont icon-fanhui"></span>
            </div>
            <div class="set" @click="isEditInof = true">
                <span class="iconfont icon-shezhi" style="color: #fff"></span>
            </div>
            <div class="my-header-bg">
                <img src="../../assets/img/user-bg1.jpg" />
            </div>
            <div class="user-title">
                <div class="my-img">
                    <div class="img-box">
                        <img :src="userAccount.profile.avatarUrl" />
                    </div>
                </div>
                <div class="my-info">
                    <p>{{ userAccount.profile.nickname }}</p>
                    <p class="lv">LV5</p>
                    <p class="desc">
                        个性签名：{{ userAccount.profile.signature }}
                    </p>
                </div>
            </div>
        </div>
        <div class="nav">
            <ul>
                <li
                    @click="num = index"
                    v-for="(item, index) in nav"
                    :key="index"
                    :class="[{ active: num == index }]"
                >
                    {{ item.name }}
                </li>
                <!-- <li class="active">喜欢音乐</li>
                <li>收藏歌单</li>
                <li>最近播放</li> -->
            </ul>
        </div>
        <div class="content">
            <div>
                <ul v-show="num == 0">
                    <li
                        class="likemusic-item"
                        v-for="(item, index) in likelist"
                        :key="index"
                    >
                        <div class="likemusic-i">{{ index + 1 }}</div>
                        <div class="likemusic-title">{{ item.name }}</div>
                        <div class="play-btn" @click="setPlayId(item.id)">
                            <span class="iconfont icon-play--outline"></span>
                        </div>
                    </li>
                </ul>
                <ul v-show="num == 1">
                    <li
                        class="album-item"
                        v-for="(item, index) in albumSublist"
                        :key="index"
                    >
                        <div class="album-item-i">
                            <div class="img-box">
                                <img :src="item.picUrl" />
                            </div>
                        </div>
                        <router-link
                            tag="div"
                            :to="'/albumlist/album?id=' + item.id"
                            class="album-item-title"
                        >
                            <p>{{ item.name }}</p>
                            <p class="tt">
                                {{ item.artists[0].name
                                }}<span>-{{ item.size }}首</span>
                            </p>
                        </router-link>
                    </li>
                </ul>
                <ul v-show="num == 2">
                    <li
                        class="likemusic-item"
                        v-for="(item, index) in historyPlaylist"
                        :key="index"
                    >
                        <div class="likemusic-i">{{ index + 1 }}</div>
                        <div class="likemusic-title">{{ item.song.name }}</div>
                        <div class="play-btn" @click="setPlayId(item.song.id)">
                            <span class="iconfont icon-play--outline"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="editInfo" v-show="isEditInof">
            <div class="editInfo-header">
                <p>我的资料</p>
                <div class="goback" @click="isEditInof = false">
                    <span class="iconfont icon-fanhui"></span>
                </div>
            </div>
            <div class="jieben constyle">
                <ul>
                    <!-- <li>
                        <div>头像</div>
                        <div class="right">
                            <input
                                type="file"
                                id="file"
                                @change="handleFile"
                                ref="inp"
                            />
                            <div class="img-box">
                                <img :src="userAccount.profile.avatarUrl" />
                            </div>
                            <span class="iconfont icon-more"></span>
                        </div>
                    </li> -->
                    <li>
                        <div>昵称</div>
                        <div class="right" @click="isEdit1 = true">
                            {{ userAccount.profile.nickname }}
                            <span class="iconfont icon-more"></span>
                        </div>
                        <div class="edit" v-show="isEdit1">
                            <ul>
                                <li @click="isEdit1 = false">取消</li>
                                <li>修改昵称</li>
                                <li @click="editNiChengFun">完成</li>
                            </ul>
                            <div class="content">
                                <input type="text" v-model="niCheng" />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>性别</div>
                        <div class="right">
                            <van-cell @click="show = true">
                                {{ userAccount.profile.gender | sexfilter
                                }}<span class="iconfont icon-more"></span>
                            </van-cell>
                        </div>
                        <van-popup
                            v-model="show"
                            position="bottom"
                            :style="{ height: '47%' }"
                        >
                            <!-- <div class="hh">
                                <span @click="show = false">取消</span
                                ><span>完成</span>
                            </div> -->
                            <van-picker
                                title="修改性别"
                                show-toolbar
                                :columns="['男', '女']"
                                @confirm="onConfirm"
                                @cancel="this.show = false"
                            />
                        </van-popup>
                    </li>
                    <!-- <li>
                        <div>二维码</div>
                        <div class="right">
                            <span class="iconfont icon-more"></span>
                        </div>
                    </li> -->
                </ul>
            </div>
            <div class="other constyle">
                <ul>
                    <!-- <li>
                        <div>生日</div>
                        <div class="right">
                            输入生日信息<span class="iconfont icon-more"></span>
                        </div>
                    </li>
                    <li>
                        <div>地区</div>
                        <div class="right">
                            广东广州<span class="iconfont icon-more"></span>
                        </div>
                    </li>
                    <li>
                        <div>大学</div>
                        <div class="right">
                            未填写<span class="iconfont icon-more"></span>
                        </div>
                    </li> -->
                    <li>
                        <div>个性签名</div>
                        <div class="right" @click="isEdit = true">
                            {{ userAccount.profile.signature
                            }}<span class="iconfont icon-more"></span>
                        </div>
                        <div class="edit" v-show="isEdit">
                            <ul>
                                <li @click="isEdit = false">取消</li>
                                <li>修改个性签名</li>
                                <li @click="signatureFun">完成</li>
                            </ul>
                            <div class="content">
                                <input type="text" v-model="signature" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <div class="safe constyle">
                <ul>
                    <li>
                        <div>隐私设置</div>
                        <div class="right">
                            <span class="iconfont icon-more"></span>
                        </div>
                    </li>
                    <li>
                        <div>账号与绑定</div>
                        <div class="right">
                            <span class="iconfont icon-more"></span>
                        </div>
                    </li>
                </ul>
            </div> -->
        </div>
    </div>
</template>
<script>
import { getUserInfo, getUserAcount, getUserSubcount } from "../../api/base";
import {
    getLikelist,
    getUserRecord,
    getAlbumSublist,
    updataUser,
    setUserIcon,
} from "../../api/base";
import { getSongDetail } from "../../api/getsong";
export default {
    data() {
        return {
            num: 0,
            nav: [
                { name: "喜欢音乐", content: "喜欢音乐内容" },
                { name: "收藏专辑", content: "收藏内容" },
                { name: "最近播放", content: "最近播放内容" },
            ],
            likelist: [],
            historyPlaylist: "", // 播放历史
            albumSublist: "", // 收藏专辑
            userAccount: {
                profile: { avatarUrl: null },
            },
            isEditInof: false, // 是否展示我的资料修改页
            isEdit: false, // 个性签名是否为编辑状态
            isEdit1: false, // 昵称是否为编辑状态
            niCheng: "", // 昵称
            show: false, // 底部弹出组件
            signature: "", // 个性签名
        };
    },
    methods: {
        // 修改头像
        handleFile() {
            console.log("改头像");
            console.log(this.$refs.inp.files[0]);
            let file = this.$refs.inp.files[0];
            var formData = new FormData();
            formData.append("imgFile", file);
            // const imgSize = getImgSize(file);
            console.log("formData",formData);
            let cookie = window.localStorage.getItem("cookie");
            let time = new Date().valueOf();
            setUserIcon({cookie:cookie,imgX:0,imgY:0,timestamp:time,imgSize:'50px'},formData).then(data=>{
                console.log("datadata",data);
            })
        },

        // 获取用户信息  /user/detail?uid=3958329393
        getUserInfoFun() {
            let cookie = window.localStorage.getItem("cookie");
            getUserInfo({ cookie: cookie }).then((data) => {
                console.log("info", data);
            });
        },
        // 获取用户账号信息  /user/account
        getUserAcountFun() {
            let cookie = window.localStorage.getItem("cookie");
            let time = new Date().valueOf();
            getUserAcount({ cookie: cookie, time: time }).then((data) => {
                console.log("userAccount", data);
                this.userAccount = data;
                this.niCheng = this.userAccount.profile.nickname;
                this.signature = this.userAccount.profile.signature;
            });
        },
        // 获取用户信息 , 歌单，收藏，mv, dj 数量 /user/subcount
        getUserSubcountFun() {
            let cookie = window.localStorage.getItem("cookie");
            getUserSubcount({ cookie: cookie }).then((data) => {
                console.log("用户信息，歌单，收藏等数量", data);
            });
        },
        // 获取用户喜欢音乐列表
        getLikelistIdFun() {
            console.log(this.$route.query.id);
            getLikelist({
                id: this.$route.query.id,
                cookie: window.localStorage.getItem("cookie"),
            }).then((data) => {
                // console.log("cc", data);
                this.getLikelistDeatailFun(data.ids);
            });
            // getSongDetail()getSong()
        },
        // 获取喜欢音乐的详情信息
        getLikelistDeatailFun(data) {
            for (let i = 0; i < data.length; i++) {
                // console.log("22",data[i]);
                getSongDetail({ ids: data[i] }).then((data) => {
                    if (data.code == 200) {
                        this.likelist.push(data.songs[0]);
                    }
                });
            }
        },
        // 获取已收藏的专辑列表 /album/sublist
        getAlbumSublistFun() {
            let cookie = window.localStorage.getItem("cookie");
            getAlbumSublist({ cookie: cookie }).then((data) => {
                this.albumSublist = data.data;
                // console.log("album", this.albumSublist);
            });
        },
        // 获取用户播放记录  /user/record?uid=32953014&type=1
        //  type=1 时只返回 weekData, type=0 时返回 allData
        getUserRecordFun() {
            let uid = window.localStorage.getItem("userId");
            let cookie = window.localStorage.getItem("cookie");
            getUserRecord({ uid: uid, type: 1, cookie: cookie }).then(
                (data) => {
                    this.historyPlaylist = data.weekData;
                    // console.log("bof历史", this.historyPlaylist);
                }
            );
        },
        setPlayId(id) {
            // console.log("id", id);
            this.$emit("setplay-id", id);
        },
        // 修改昵称
        editNiChengFun() {
            // console.log(this.niCheng);
            let cookie = window.localStorage.getItem("cookie");
            let time = new Date().valueOf();
            updataUser({
                nickname: this.niCheng,
                cookie: cookie,
                time: time,
            }).then((data) => {
                console.log(data);
                if (data.code == 200) {
                    console.log("成功");
                    // this.$set(this.userAccount.profile,'nickname',this.niCheng)
                    this.userAccount.profile.nickname = this.niCheng;
                    this.isEdit = false;
                }
            });
        },
        // 修改性别
        onConfirm(value, index) {
            this.show = false;
            let cookie = window.localStorage.getItem("cookie");
            let time = new Date().valueOf();
            updataUser({
                gender: index + 1,
                cookie: cookie,
                time: time,
            }).then((data) => {
                console.log(data);
                if (data.code == 200) {
                    console.log("sex成功");
                    this.userAccount.profile.gender = index + 1;
                    this.isEdit = false;
                }
            });
        },
        // 修改个性签名
        signatureFun() {
            let cookie = window.localStorage.getItem("cookie");
            let time = new Date().valueOf();
            updataUser({
                signature: this.signature,
                cookie: cookie,
                time: time,
            }).then((data) => {
                console.log(data);
                if (data.code == 200) {
                    console.log("成功");
                    // this.$set(this.userAccount.profile,'nickname',this.niCheng)
                    this.userAccount.profile.signature = this.signature;
                    this.isEdit = false;
                }
            });
        },
    },
    created() {
        this.getUserInfoFun(),
            this.getUserAcountFun(),
            this.getUserSubcountFun();
        this.getLikelistIdFun();
        this.getAlbumSublistFun();
        this.getUserRecordFun();
    },
    filters: {
        sexfilter(val) {
            return val == 1 ? "男" : "女";
        },
    },
};
</script>
<style lang="less">
input {
    text-indent: 10px;
}
.my-header {
    position: relative;
    .goback {
        position: absolute;
        top: 12px;
        left: 12px;
        .icon-fanhui {
            color: #fff;
        }
    }
    .set {
        position: absolute;
        top: 12px;
        right: 12px;
    }
    .my-header-bg {
        font-size: 0;
        img {
            width: 100%;
        }
    }
    .user-title {
        color: #fff;
        position: absolute;
        bottom: 10px;
        z-index: 1;
        display: flex;
        width: 100%;
        align-items: flex-end;
        .my-img {
            flex: 0 0 100px;
            // height: 40px;
            margin-right: 5px;
            .img-box {
                background-color: blanchedalmond;
                width: 80px;
                height: 80px;
                margin: 0 auto;
                margin-top: 20px;
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: 100%;
                }
            }
        }
        .my-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-bottom: 5px;
            .lv {
                font-size: 10px;
                margin-top: 5px;
                background: #ccc8;
                display: inline-block;
                width: 32px;
                border-radius: 10px;
                text-align: center;
            }
            .desc {
                margin-top: 5px;
                font-size: 13px;
            }
        }
    }
}
.nav {
    ul {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #ccc4;
        li {
            flex: 1;
            text-align: center;
            height: 46px;
            line-height: 46px;
            &.active {
                border-bottom: 2px solid #da5044;
            }
        }
    }
}
.content {
    // background: #ccc7;
    // padding-top: 10px;
    ul {
        margin-top: 10px;
        border-radius: 8px;
        margin: 0px 10px;
        background: #fff;
    }
    .likemusic-item {
        display: flex;
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #ccc4;
        .likemusic-i {
            flex: 0 0 40px;
            text-align: center;
        }
        .likemusic-title {
            flex: 1;
        }
        .play-btn {
            flex: 0 0 50px;
            text-align: center;
            .iconfont {
                font-size: 28px;
                color: #666;
            }
        }
    }
    .album-item {
        display: flex;
        align-items: center;
        .album-item-i {
            flex: 0 0 60px;
            text-align: center;
            height: 70px;
            margin-right: 5px;
            .img-box {
                width: 50px;
                height: 50px;
                margin: 0 auto;
                margin-top: 10px;
                img {
                    width: 100%;
                }
            }
        }
        .album-item-title {
            flex: 1;
            .tt {
                font-size: 14px;
                margin-top: 5px;
                color: #999;
            }
        }
    }
}
.editInfo {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f7f7f7;
    z-index: 1;
    .editInfo-header {
        position: relative;
        height: 48px;
        line-height: 48px;
        background-color: #fff;
        text-align: center;
        box-shadow: 0px 0px 6px -2px #d0c9c9;
        p{
            background: #fff;
        }
        .goback {
            position: absolute;
            // top: 12px;
            left: 12px;
            // z-index: 10;
            top: 0;
            .icon-fanhui {
                // color: #fff;
                font-size: 20px;
            }
        }
    }
    .constyle {
        padding: 0 10px;
        background-color: #fff;
        margin-top: 10px;
        li {
            height: 52px;
            line-height: 52px;
            border-bottom: 1px solid #ccc3;
            display: flex;
            justify-content: space-between;
            .right {
                color: #999;
                .iconfont {
                    margin-left: 5px;
                }
                .img-box {
                    width: 30px;
                    display: inline-block;
                    // margin-top: 11px;
                    img {
                        width: 30px;
                        vertical-align: middle;
                        overflow: hidden;
                        border-radius: 15px;
                    }
                }
                .van-cell {
                    padding-right: 0 !important;
                    .van-cell__value {
                        color: #999;
                    }
                }
            }
            .van-popup {
                // .hh {
                //     display: flex;
                //     justify-content: space-between;
                //     padding: 0 10px;
                //     // height: 32px;
                //     line-height: 32px;
                //     background-color: #f1f3f4;
                // }
                .van-ellipsis {
                    width: 100%;
                    text-align: center;
                }
                .editInfo .constyle li {
                    border-bottom: none !important;
                }
            }
        }
    }
    .edit {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #f7f7f7;
        z-index: 99;
        ul {
            display: flex;
            height: 48px;
            background-color: #fff;
            justify-content: space-between;
            padding: 0 10px;
            color: #000;
            li {
                line-height: 48px;
                .right {
                }
            }
        }
        .content {
            margin-top: 8px;
            background-color: #fff;
            input {
                width: 100%;
                border: none;
            }
        }
    }
}
</style>