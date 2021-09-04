<template>
    <div>
        <div class="swiper-container" id="swiper-container1">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="item">
                        <div class="img-box">头像</div>
                        <div class="desc">
                            <p class="title">歌名</p>
                            <p class="author">歌手</p>
                        </div>
                        <div class="icon"><span class="iconfont icon-play"></span></div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="item">
                        <div class="img-box">头像</div>
                        <div class="desc">
                            <p class="title">歌名</p>
                            <p class="author">歌手</p>
                        </div>
                        <div class="icon"><span class="iconfont icon-play"></span></div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="item">
                        <div class="img-box">头像</div>
                        <div class="desc">
                            <p class="title">歌名</p>
                            <p class="author">歌手</p>
                        </div>
                        <div class="icon"><span class="iconfont icon-play"></span></div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="item">
                        <div class="img-box">头像</div>
                        <div class="desc">
                            <p class="title">歌名</p>
                            <p class="author">歌手</p>
                        </div>
                        <div class="icon"><span class="iconfont icon-play"></span></div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="item">
                        <div class="img-box">头像</div>
                        <div class="desc">
                            <p class="title">歌名</p>
                            <p class="author">歌手</p>
                        </div>
                        <div class="icon"><span class="iconfont icon-play"></span></div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="item">
                        <div class="img-box">头像</div>
                        <div class="desc">
                            <p class="title">歌名</p>
                            <p class="author">歌手</p>
                        </div>
                        <div class="icon"><span class="iconfont icon-play"></span></div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="item">
                        <div class="img-box">头像</div>
                        <div class="desc">
                            <p class="title">歌名</p>
                            <p class="author">歌手</p>
                        </div>
                        <div class="icon"><span class="iconfont icon-play"></span></div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="item">
                        <div class="img-box">头像</div>
                        <div class="desc">
                            <p class="title">歌名</p>
                            <p class="author">歌手</p>
                        </div>
                        <div class="icon"><span class="iconfont icon-play"></span></div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="item">
                        <div class="img-box">头像</div>
                        <div class="desc">
                            <p class="title">歌名</p>
                            <p class="author">歌手</p>
                        </div>
                        <div class="icon"><span class="iconfont icon-play"></span></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- swiper2 -->
    </div>
</template>
<script>
import Swiper from "swiper";
export default {
    methods: {},
    props:["newsongdata"],
    mounted() {
        // 推荐新歌轮播图
        new Swiper(".swiper-container", {
            slidesPerView: 1.2,
            slidesPerColumn: 3,
            slidesPerColumnFill: "row",
        });
        console.log("ss",this.newsongdata);
    },
};
</script>
<style lang="less" scoped>
.newsong {
}
.swiper-container {
    // width: 98%;
}
.swiper-slide {
    .item {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: pink;
        margin-top: 8px;
        // margin-right: 5px;
        .img-box {
            flex: 0 0 60px;
            height: 60px;
            background-color: gold;
            margin-right: 10px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .desc{
            flex: 1;
            text-align: left;
            .title{
                font-size: 14px;
            }
            .author{
                font-size: 12px;
                color: #666;
                margin-top: 3px;
            }
        }
        .icon{
            flex: 0 0 40px;
            text-align: center;
        }
    }
}
</style>