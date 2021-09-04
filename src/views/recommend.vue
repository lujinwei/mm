<template>
    <div>
        <!-- 轮播图 -->
        <div class="banner">
            <div class="bg"></div>
            <div class="swiper">
                <div class="wrap">
                    <van-swipe
                        class="my-swipe"
                        :autoplay="6000"
                        indicator-color="white"
                    >
                        <van-swipe-item
                            v-for="(item, index) in bannerImgs"
                            :key="index"
                        >
                            <img :src="item.pic"/>
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </div>
        </div>
        <!-- 推荐歌单 -->
        <div class="recommend-music">
            <h4 class="title">
                <span class="t">推荐歌单</span>
                <span class="more" @click="$router.push('/square')">更多<i class="iconfont icon-gengduo1"></i
                ></span>
            </h4>
            <ul class="recommend-list">
                <router-link
                    tag="li"
                    :to="'/toplist/ranklist?id=' + item.id + '&type=0'"
                    class="item"
                    v-for="(item, index) in recommendData"
                    :key="index"
                >
                    <div class="img-box">
                        <img :src="item.picUrl" />
                    </div>
                    <p>{{ item.name }}</p>
                    <span class="count"
                        ><i class="iconfont icon-erji"></i
                        >{{ item.playCount | playCountFilters }}</span
                    >
                </router-link>
            </ul>
        </div>
        <!-- 推荐歌手 -->
        <div class="recommend-singer">
            <h4 class="title">
                <span class="t">推荐歌手</span>
                <span class="more"
                    >更多<i class="iconfont icon-gengduo1"></i
                ></span>
            </h4>
            <div class="singer">
                <ul>
                    <router-link
                        tag="li"
                        :to="'/toplist/singermusic?id=' + item.id + '&type=1'"
                        class="item"
                        v-for="(item, index) in recommendSinger"
                        :key="index"
                    >
                        <div class="img-box">
                            <img :src="item.picUrl" />
                        </div>
                        <p>{{ item.name }}</p>
                    </router-link>
                    <!-- <li
                        class="item"
                        v-for="(item, index) in recommendSinger"
                        :key="index"
                    >
                        <div class="img-box">
                            <img :src="item.picUrl" />
                        </div>
                        <p>{{ item.name }}</p>
                    </li> -->
                </ul>
            </div>
        </div>
        <!-- 推荐电台 -->
        <!-- <div class="recommend-station">
            <h4 class="title">
                <span class="t">推荐电台</span>
                <span class="more"
                    >更多<i class="iconfont icon-gengduo1"></i
                ></span>
            </h4>
            <div class="station">
                <ul>
                    <li
                        class="item"
                        v-for="(item, index) in recommendStation"
                        :key="index"
                    >
                        <div class="img-box">
                            <img :src="item.picUrl" />
                            <span
                                ><i class="iconfont icon-play"></i
                                >{{ item.subCount | playCountFilters }}</span
                            >
                        </div>
                        <p>{{ item.name }}</p>
                    </li>
                </ul>
            </div>
        </div> -->
        <!-- 推荐专辑 -->
        <div class="recommend-station">
            <h4 class="title">
                <span class="t">推荐专辑</span>
                <span class="more"
                    >更多<i class="iconfont icon-gengduo1"></i
                ></span>
            </h4>
            <div class="station">
                <ul>
                    <li
                        class="item"
                        v-for="(item, index) in albumNewestData"
                        :key="index"
                    >
                        <router-link
                            tag="div"
                            :to="'/albumlist/album?id='+item.id"
                             class="img-box album-box-icon">
                            <img :src="item.picUrl" />
                            <!-- <span
                                ><i class="iconfont icon-play"></i
                                >{{ item.subCount | playCountFilters }}</span
                            > -->
                        </router-link>
                        <p>{{ item.name }}</p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 推荐新歌 -->
        <div class="recommend-newsong">
            <h4 class="title">
                <span class="t">推荐新歌</span>
                <span class="more"
                    >更多<i class="iconfont icon-gengduo1"></i
                ></span>
            </h4>
            <div class="newsong" v-if="newsongData[0]">
                <!-- 新歌滑块组件 -->
                <div class="swiper-container" id="swiper-container1">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="(item, index) in newsongData.slice(0, 9)"
                            :key="index"
                        >
                            <div class="item">
                                <div class="img-box">
                                    <img :src="item.picUrl" />
                                </div>
                                <div class="desc">
                                    <p class="title">{{ item.name }}</p>
                                    <p class="author">
                                        <span
                                            v-for="(val, i) in item.song
                                                .artists"
                                            :key="i"
                                            >{{ val.name }}</span
                                        >
                                    </p>
                                </div>
                                <div class="icon" @click="playmusic(item.id)">
                                    <span class="iconfont icon-play--outline"></span>
                                    <!-- <span class="iconfont icon-bofang1"></span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <my-swiper :newsongdata="newsongData"></my-swiper> -->
            </div>
        </div>
        <!-- 底部 -->
        <div class="recomend-footer">
            <div class="ftwrap">
                <div class="logo">
                    <span class="img-box"
                        ><img src="../assets/img/logo.png"
                    /></span>
                    <span>小易音乐</span>
                </div>
                <div class="download">更多音乐，请下载APP</div>
                <!-- <div class="foot-txt">欢迎收听网易云音乐</div> -->
            </div>
        </div>
    </div>
</template>
<script>
import {
    getBanner,
    getRecommend,
    getRecommendSinger,
    getRecommendStation,
    getNewsong,
    getAlbumNewest,
} from "../api/recommend";
// import mySwiper from "../components/base/mySwiper.vue";
import Swiper from "swiper";
export default {
    data() {
        return {
            bannerImgs: [], // 轮播图数据
            recommendData: [], // 推荐歌单数据
            recommendSinger: [], // 推荐歌手数据
            recommendStation: [], // 推荐电台数据
            newsongData: [], // 获取新歌数据
            albumNewestData: [], // 最新专辑
        };
    },
    methods: {
        // 获取轮播图图片数据
        getBannerFun() {
            getBanner().then((data) => {
                this.bannerImgs = data.banners;
            });
        },
        // 获取推荐歌单数据
        getRecommendFun() {
            getRecommend().then((data) => {
                this.recommendData = data.result;
            });
        },
        // 获取热门歌手
        getRecommendSingerFun() {
            getRecommendSinger().then((data) => {
                this.recommendSinger = data.artists;
            });
        },
        // 获取电台个性推荐数据
        getRecommendStationFun() {
            getRecommendStation().then((data) => {
                // console.log(data);
                this.recommendStation = data.data;
            });
        },
        // 获取新歌数据
        getNewsongFun() {
            getNewsong().then((data) => {
                if (data.code == 200) {
                    this.newsongData = data.result;
                }
            });
        },
        // 获取最新专辑 /album/newest
        getAlbumFun() {
            getAlbumNewest().then((data) => {
                this.albumNewestData = data.albums;
                console.log(this.albumNewestData);
            });
        },
        playmusic(id){
            this.$emit("setplay-id",id);
        }
    },
    filters: {
        // 推荐歌单数量过滤
        playCountFilters(val) {
            // console.log(val);
            let w = val > 10000 ? val / 10000 : val;
            let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万";
            return y;
        },
    },
    created() {
        this.getBannerFun();
        this.getRecommendFun();
        this.getRecommendSingerFun();
        this.getRecommendStationFun();
        this.getNewsongFun();
        this.getAlbumFun();
    },
    // components: { mySwiper },
    mounted() {
        // 推荐新歌轮播图
        this.$nextTick(() => {
            setTimeout(() => {
                new Swiper(".swiper-container", {
                    slidesPerView: 1.2,
                    slidesPerColumn: 3,
                    slidesPerColumnFill: "row",
                });
            }, 1000);
        });
    },
};
</script>
<style lang="less">
.banner {
    margin-top: 80px;
    width: 100%;
    // height: 135px;
    // background-color: #d44439;
    position: relative;
    // margin-bottom: 34px;
    margin-bottom: 6px;
    .bg {
        position: absolute;
        width: 100%;
        height: 85%;
        background-color: #d44439;
    }
    .swiper {
        width: 100%;
        height: auto;
        .wrap {
            width: 96%;
            min-height: 135px;
            margin: auto;
            background-color: pink;
            border-radius: 3px;
            overflow: hidden;
            font-size: 0;
            .my-swipe .van-swipe-item {
                width: 100%;
                color: #fff;
                text-align: center;
                background-color: #39a9ed;
                font-size: 0;
                img {
                    width: 100%;
                    // height: 100%;
                    min-height: 135px;
                }
            }
        }
    }
}
// 推荐列表css
h4.title {
    height: 56px;
    // line-height: 56px;
    margin: 0 2%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .t {
        height: 18px;
        line-height: 18px;
        font-size: 16px;
        text-indent: 3px;
        font-weight: 600;
        border-left: 3px solid #d44439;
    }
    .more {
        font-size: 12px;
        color: skyblue;
        .icon-gengduo1 {
            font-size: 12px;
        }
    }
}
.album-box-icon {
    position: relative;
    &::after {
        content: "专辑";
        font-size: 10px;
        display: block;
        position: absolute;
        top: 10px;
        width: 38px;
        height: 16px;
        text-indent: 4px;
        line-height: 16px;
        color: #fff;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        background-color: #e43137;
    }
}
.recommend-music {
    .recommend-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 2%;
        .item {
            flex: 0 0 32%;
            // height: 100px;
            // background-color: rebeccapurple;
            margin-bottom: 15px;
            position: relative;
            .img-box {
                border-radius: 3px;
                overflow: hidden;
                width: 100%;
                img {
                    width: 100%;
                    height: auto;
                    display: block;
                }
            }
            p {
                font-size: 13px;
                line-height: 16px;
                margin-top: 5px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .count {
                position: absolute;
                top: 3px;
                right: 3px;
                font-size: 10px;
                color: #fff;
                .icon-erji {
                    font-size: 17px;
                    color: #fff;
                    vertical-align: middle;
                    padding-right: 2px;
                }
            }
        }
    }
}
.recommend-singer {
    .singer {
        padding: 0 2%;
        width: 100%;
        // overflow: hidden;
        overflow-y: hidden;
        overflow-x: auto;
        box-sizing: border-box;
        &::-webkit-scrollbar {
            // width: 0 !important;
            display: none;
        }
        ul {
            display: flex;
            flex-wrap: nowrap;
            .item {
                flex: 0 0 33%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .img-box {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    img {
                        height: 100%;
                    }
                }
                p {
                    height: 40px;
                    line-height: 40px;
                    font-size: 18px;
                }
            }
        }
    }
}
.recommend-station {
    width: 100%;
    .station {
        padding: 0 2%;
        overflow-x: auto;
        box-sizing: border-box;
        &::-webkit-scrollbar {
            width: 0 !important;
        }
        ul {
            display: flex;
            .item {
                flex: 0 0 33.33%;
                width: 33%;
                padding-right: 2%;
                box-sizing: border-box;
                .img-box {
                    width: 100%;
                    border-radius: 5px;
                    overflow: hidden;
                    font-size: 0;
                    position: relative;
                    .icon-play {
                        font-size: 10px;
                        padding-right: 3px;
                    }
                    span {
                        position: absolute;
                        bottom: 4px;
                        left: 6px;
                        z-index: 10;
                        font-size: 10px;
                        display: block;
                        color: #fff;
                        background-color: #9996;
                        border-radius: 6px;
                        padding: 2px 6px;
                    }
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
                p {
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    line-clamp: 1;
                    -webkit-box-orient: vertical;
                    font-size: 13px;
                }
            }
        }
    }
}
.recommend-newsong {
    .newsong {
        padding-left: 2%;
    }
    .swiper-slide {
        .item {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // background-color: #9992;
            margin-top: 8px;
            // margin-right: 5px;
            .img-box {
                flex: 0 0 60px;
                height: 60px;
                background-color: gold;
                margin-right: 10px;
                border-radius: 3px;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .desc {
                flex: 1;
                text-align: left;
                .title {
                    font-size: 15px;
                }
                .author {
                    font-size: 12px;
                    color: #666;
                    margin-top: 3px;
                }
            }
            .icon {
                flex: 0 0 50px;
                text-align: center;
                .iconfont {
                    font-size: 32px;
                    // font-size: 24px;
                    color: #999;
                    margin-right: 16px;
                }
            }
        }
    }
}
.recomend-footer {
    width: 100%;
    height: 150px;
    .ftwrap {
        width: 100%;
        height: 150px;
        background: url(../assets/img/recommand_bg_2x.png) no-repeat 0 0 / cover;
    }
    .logo {
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        height: 30px;
        line-height: 30px;
        padding-top: 30px;
        position: relative;
        display: flex;
        justify-content: center;
        .img-box {
            width: 30px;
            height: 30px;
            border-radius: 6px;
            overflow: hidden;
            margin-right: 6px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .download {
        width: 200px;
        margin: 0 auto;
        margin-top: 10px;
        height: 30px;
        line-height: 30px;
        border: 1px solid pink;
        text-align: center;
        border-radius: 15px;
        color: #d44439;
    }
}
</style>