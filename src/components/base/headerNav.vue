<template>
    <div class="headerNav">
        <div class="header">
            <div class="left">
                <!-- <span @click="showPopup" class="iconfont icon-gengduo"></span> -->
                <router-link tag="span" to="/userIndex" class="iconfont icon-gengduo"></router-link>
            </div>
            <div class="center">XIAOYIMUSIC</div>
            <div class="right">
                <!-- <span class="iconfont icon-sousuo2"></span> -->
                <router-link
                    to="/search"
                    tag="span"
                    class="iconfont icon-sousuo2"
                ></router-link>
            </div>
        </div>
        <div class="navs">
            <router-link to="/recommendlist"><span>推荐</span></router-link>
            <router-link to="/toplist"><span>排行</span></router-link>
            <router-link to="/playlist"><span>歌手</span></router-link>
            <router-link to="/mvlist"><span>MV</span></router-link>
        </div>
        <!--弹出层  -->
        <van-popup
            v-model="show"
            position="left"
            :style="{ width: '75%', height: '100%' }"
        >
            <div class="user">
                <div class="info-contain">
                    <div class="user-header">
                        <div class="user-img">
                            <img :src="infoData.profile.avatarUrl" />
                        </div>
                        <router-link tag="div" to="/userIndex" class="user-name">
                            {{ infoData.profile.nickname
                            }}<span class="iconfont icon-more"></span>
                        </router-link>
                        <!-- <div class="user-name">
                            {{ infoData.profile.nickname
                            }}<span class="iconfont icon-more"></span>
                        </div> -->
                    </div>
                    <div class="vip">
                        <p>开通VIP<span>会员中心</span></p>
                        <span class="txt">立享超17项专属特权</span>
                        <div>
                            <span>受邀专享，黑胶VIP低至0.04元/天！</span>
                        </div>
                    </div>
                    <ul class="user-message">
                        <li>
                            <span class="iconfont icon-a-xiaoxi"></span
                            >消息中心<span class="iconfont icon-more"></span>
                        </li>
                        <li>
                            <span class="iconfont icon-huiyuan_"></span
                            >会员中心<span class="iconfont icon-more"></span>
                        </li>
                        <li>
                            <span class="iconfont icon-dengpao"></span
                            >创作者中心<span class="iconfont icon-more"></span>
                        </li>
                    </ul>
                    <div class="music-server music">
                        <h6>音乐服务</h6>
                        <ul>
                            <li>
                                <span class="iconfont icon-yanchu"></span
                                >演出中心<span
                                    class="iconfont icon-more"
                                ></span>
                            </li>
                            <li>
                                <span class="iconfont icon-shangcheng"></span
                                >商城<span class="iconfont icon-more"></span>
                            </li>
                            <li>
                                <span class="iconfont icon-youxi"></span
                                >游戏中心<span
                                    class="iconfont icon-more"
                                ></span>
                            </li>
                        </ul>
                    </div>
                    <div class="user-other music">
                        <h6>其他</h6>
                        <ul>
                            <li>
                                <span
                                    class="iconfont icon-gexingzhuangban"
                                ></span
                                >个性装扮<span
                                    class="iconfont icon-more"
                                ></span>
                            </li>
                            <li>
                                <span class="iconfont icon-dingshi"></span
                                >定时关闭<span
                                    class="iconfont icon-more"
                                ></span>
                            </li>
                            <li>
                                <span
                                    class="iconfont icon-fuwupingjia-kefu"
                                ></span
                                >我的客服<span
                                    class="iconfont icon-more"
                                ></span>
                            </li>
                            <li>
                                <span class="iconfont icon-guanyu"></span
                                >关于<span class="iconfont icon-more"></span>
                            </li>
                            <li>
                                <span class="iconfont icon-shezhi"></span
                                >设置<span class="iconfont icon-more"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="back-btn">
                        <div @click="logout">退出登录</div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import { getUserInfo } from "../../api/base";
export default {
    data() {
        return {
            show: false,
            infoData: {
                profile: {
                    nickname: null,
                    avatarUrl: null,
                },
            },
        };
    },
    methods: {
        // 显示个人中心侧栏
        showPopup() {
            let userid = window.localStorage.getItem("userId");
            if (!userid) {
                this.$router.push("/login");
                return;
            }
            console.log(userid);
            this.show = true;
            this.getUserInfoFun();
        },
        // 获取用户信息 /user/detail?uid=3958329393
        getUserInfoFun() {
            getUserInfo({ uid: window.localStorage.getItem("userId") }).then(
                (data) => {
                    console.log(data);
                    this.infoData = data;
                }
            );
        },
        // 退出登录
        logout(){
            localStorage.removeItem("userId");
            localStorage.removeItem("login");
            this.show = false;
        }
    },
    // created(){
    //     this.getUserInfoFun();
    // }
};
</script>
<style lang="less">
.user {
    background-color: rgb(243, 243, 243);
    // height: 100%;
    padding: 0 12px;
    padding-bottom: 15px;

    .info-contain {
        height: auto;
        .iconfont {
            font-size: 16px;
            color: #999 !important;
            margin-right: 8px;
        }
    }
    .user-header {
        height: 50px;
        display: flex;
        align-items: center;
        // position: fixed;
        .icon-more {
            font-size: 12px !important;
            margin-top: 5px;
        }
        .user-img {
            width: 30px;
            height: 30px;
            background-color: violet;
            border-radius: 50%;
            margin-right: 8px;
            overflow: hidden;
            img {
                width: 100%;
            }
        }
    }
    .vip {
        background-color: #ccc;
        height: 100px;
        border-radius: 10px;
        padding: 10px 8px;
        box-sizing: border-box;
        p {
            width: 100%;
            height: 28px;
            line-height: 28px;
            font-weight: 800;
            color: #fff;
            span {
                float: right;
                display: block;
                border: 1px solid #fff;
                font-size: 12px;
                color: #fff;
                font-weight: normal;
                border-radius: 11px;
                height: 22px;
                margin-top: 3px;
                line-height: 22px;
                padding: 0 6px;
                box-sizing: border-box;
            }
        }
        div {
            span {
                font-size: 12px;
                color: #666;
                // padding-top: 30px;
            }
        }
    }
    .user-message {
        margin-top: 15px;
        background-color: #fff;
        padding-left: 10px;
        border-radius: 10px;
        li {
            height: 42px;
            line-height: 42px;
            border-bottom: 1px solid #ccc4;
        }
        li:last-child {
            border: none;
        }
    }
    .music {
        background-color: #fff;
        margin-top: 15px;
        border-radius: 10px;
        h6 {
            font-size: 14px;
            height: 28px;
            line-height: 28px;
            padding-left: 10px;
            color: #ccc;
            border-bottom: 1px solid #ccc5;
        }
        ul {
            padding-left: 10px;
            li {
                height: 42px;
                line-height: 42px;
            }
        }
    }
    .back-btn {
        // position: absolute;
        // display: flex;
        // justify-content: space-between;
        height: 36px;
        line-height: 36px;
        border-radius: 18px;
        text-align: center;
        margin-top: 15px;
        color: #fff;
        background: rgb(248, 42, 42);
        // bottom: 0;
        // left: 0;
    }
    .icon-more {
        font-size: 12px !important;
        float: right;
    }
}
.headerNav {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
    max-width: 750px;
    // min-width: 320px;
}
.header {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #d44439;
    color: #fff;
    text-align: center;

    .left,
    .right {
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }
    .right {
        font-size: 19px;
    }
    .center {
        flex: 1;
        line-height: 40px;
    }
}
.navs {
    width: 100%;
    height: 40px;
    background-color: #d44439;
    display: flex;
    justify-content: space-around;
    align-items: center;
    a {
        color: #fff;
        span {
            height: 21px;
            line-height: 21px;
            display: inline-block;
            border-bottom: 1px solid transparent;
        }
    }
    .router-link-active {
        span {
            border-bottom: 1px solid #fff;
        }
    }
}
</style>