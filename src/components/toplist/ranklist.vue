<template>
    <div class="ranklist">
        <div class="topheader">
            <div class="img-box"><img :src="coverImgUrl" /></div>
            <div @click="$router.go(-1)" class="back-btn">
                <i class="iconfont icon-fanhui"></i>
            </div>
            <div class="desc">{{ titleName }}</div>
        </div>
        <dl class="musiclist">
            <dt @click="getPlaylistIdFun">
                <i class="iconfont icon-bofang"></i>全部播放<span class="sum"
                    >(共{{ ranklistData.length }}首)</span
                >
            </dt>
            <dl v-for="(item, index) in ranklistData" :key="index">
                <div class="num">{{ index + 1 }}</div>
                <div class="musicname" @click="setplayId(item.id)">
                    <h3>{{ item.name }}</h3>
                    <h4>
                        <span v-for="(val, i) in item.ar" :key="i">{{
                            val.name
                        }}</span>
                    </h4>
                </div>
            </dl>
        </dl>
        <div class="footer">没有更多了</div>
    </div>
</template>
<script>
import { getplaylistDetail } from "../../api/toplist"; // 请求排行榜歌单列表数据

import { getArtistSong, getArtistData } from "../../api/artistsong"; // 请求歌手歌单列表数据

export default {
    data() {
        return {
            ranklistData: [], // 歌单列表数据
            playId: null, // 播放音乐id
            coverImgUrl:"", // 头部封面图片url
            titleName:"", // 头部封面标题
            playlistType:"", // 歌单列表类型，0：排行榜歌单，1：歌手歌单；
        };
    },
    methods: {
        // 把播放id传给父组件
        setplayId(id) {
            // console.log(id);
            this.$emit("setplay-id", id);
        },
        // 获取播放列表id函数
        getPlaylistIdFun() {
            // let playlist = [];
            // this.ranklistData.tracks.forEach((item,index) => {
            //     playlist.push({index,id:item.id})
            // });
            // this.$emit("get-playlist", playlist)
            this.$emit("get-playlist-id", this.$route.query.id); // 把全部播放的列表id传给播放器
            // 第一个播放id传给播放器
            this.setplayId(this.ranklistData[0].id);
        },
    },
    created() {
        let type = this.$route.query.type;
        console.log(type);
        // 根据路由类型，请求相应的数据
        if (type == "0") { // 获取首页排行榜歌单列表数据
            this.playlistType = "歌单"
            // 获取歌单列表
            getplaylistDetail({ id: this.$route.query.id }).then((data) => {
                // console.log(this.$route.query.id,data);
                this.ranklistData = data.playlist.tracks; // 歌单列表
                this.coverImgUrl = data.playlist.coverImgUrl;
                this.titleName = data.playlist.name;
            });
        } else if (type == "1") {
            this.playlistType = "歌手"
            // 获取歌手歌单列表
            console.log(this.$route.query.id);
            getArtistSong({ id: this.$route.query.id }).then((data) => {
                // console.log(data);
                this.ranklistData = data.songs;
                console.log(data);
            });
            // 获取歌手信息
            getArtistData({ id: this.$route.query.id }).then((data) => {
                console.log(data);
               this.coverImgUrl = data.artist.picUrl;
                this.titleName = data.artist.name;
            });
        }
    },
};
</script>
<style lang="less">
.ranklist {
    .topheader {
        height: 278px;
        background-color: pink;
        position: relative;
        .img-box {
            width: 100%;
            height: 100%;
            position: relative;
            img {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                width: 100%;
            }
        }
        .back-btn {
            position: absolute;
            top: 12px;
            left: 12px;
            color: #fff;
            font-size: 17px;
            .iconfont {
                text-align: center;
                display: inline-block;
                margin-right: 3px;
            }
        }
        .desc {
            position: absolute;
            bottom: 17px;
            font-size: 16px;
            color: #fff;
            left: 16px;
        }
    }
    .musiclist {
        position: relative;
        top: -7px;
        // margin-bottom: 48px;
        background-color: #f2f3f4;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        dt {
            height: 35px;
            line-height: 35px;
            border-bottom: 2px solid #e3e3e3;
            .iconfont {
                width: 44px;
                display: inline-block;
                text-align: center;
                font-size: 21px;
                vertical-align: middle;
                color: #666;
            }
            .sum {
                font-size: 12px;
                margin-left: 6px;
            }
        }
        dl {
            height: 53px;
            line-height: 53px;
            border-bottom: 2px solid #e3e3e3;
            display: flex;
            // overflow: hidden;
            // width: 100%;
            .num {
                flex: 0 0 44px;
                text-align: center;
                font-size: 16px;
            }
            .musicname {
                flex: 1;
                h3 {
                    width: 260px;
                    margin-top: 8px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                h4 {
                    width: 260px;
                    font-size: 12px;
                    height: 18px;
                    line-height: 18px;
                    color: #7d7e7d;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
    .footer {
        height: 48px;
        background-color: #f2f3f4;
        text-align: center;
        line-height: 48px;
    }
}
</style>