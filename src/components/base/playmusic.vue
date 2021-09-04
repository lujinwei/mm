<template>
    <div>
        <!-- 播放界面 -->
        <transition name="fullscreen" >
        
        <div class="entermusic" v-if="showPlay">
            <div class="header1">
                <div class="btn" @click="showPlay = false">
                    <span class="iconfont icon-xiala"></span>
                </div>
                <div class="title">
                    <h3>{{ songdata.name }}</h3>
                    <h4>{{ songdata.ar[0].name }}</h4>
                </div>
            </div>
            <div class="content">
                <div
                    class="imgbox"
                    v-show="!isShowLyrics"
                    @click="isShowLyrics = true"
                >
                    <img
                        :src="songdata.al.picUrl"
                        :class="{ pause: !isplayMusic }"
                    />
                </div>
                <div
                    class="lyrics"
                    v-show="isShowLyrics"
                    @click="isShowLyrics = false"
                >
                    <ul :style="{ top: lyricTop }">
                        <li
                            v-for="(item, index) in lyrics"
                            :key="index"
                            :class="{ con: index == lyricsIndex }"
                        >
                            {{ item.text }}
                        </li>
                    </ul>
                    <div class="bg"></div>
                </div>
            </div>
            <div class="control">
                <div class="top">
                    <span>{{ currentTime | playTime }}</span>
                    <van-slider
                        bar-height="4px"
                        active-color="#ee0a24"
                        v-model="value"
                        @change="changeProgress"
                        @input="lyricInput"
                    >
                        <template #button>
                            <div class="custom-button"></div>
                        </template>
                    </van-slider>
                    <span>{{ duration | playTime }}</span>
                </div>
                <ul class="bottom">
                    <li>
                        <!-- 播放类型 -->
                        <span
                            @click="changePlayType"
                            :class="[
                                'iconfont',
                                { 'icon-xunhuanbofang': playType == 0 },
                                { 'icon-danquxunhuan': playType == 1 },
                                { 'icon-random': playType == 2 },
                            ]"
                        ></span>
                    </li>
                    <li>
                        <span
                            class="iconfont icon-shangyishoushangyige"
                            @click="preniousSong"
                        ></span>
                    </li>
                    <!-- <li><span class="iconfont icon-stopfill"></span></li> -->
                    <li>
                        <!-- { 'icon-ico_zanting_xuanzhong': isplayMusic },
                                { 'icon-stopfill': !isplayMusic }, -->
                        <span
                            :class="[
                                'iconfont',
                                { 'icon-pause--outline': isplayMusic },
                                { 'icon-play--outline': !isplayMusic },
                            ]"
                            @click="playMusic()"
                        ></span>
                    </li>
                    <li>
                        <span
                            class="iconfont icon-xiayigexiayishou"
                            @click="nextSong"
                        ></span>
                    </li>
                    <li @click="sendlikemisicFun">
                        <span
                            :class="['iconfont', {'icon-aixin':!like}, { 'icon-aixin3': like }]"
                        ></span>
                    </li>
                </ul>
            </div>
        </div>
        </transition>


        <!-- 迷你播放器 -->
        <div class="miniplaymusic" v-if="songdata.al">
            <div class="left">
                <div class="user-icon" @click="showPlay = true">
                    <img
                        :src="songdata.al.picUrl"
                        :class="{ pause: !isplayMusic }"
                    />
                </div>
                <div class="desc">
                    <h3>{{ songdata.name }}</h3>
                    <h4>{{ songdata.ar[0].name }}</h4>
                </div>
            </div>
            <div class="right">
                <!-- <span class="iconfont icon-bofang" @click="playMusic()"></span> -->
                <span
                    :class="[
                        'iconfont',
                        { 'icon-pause--outline': isplayMusic },
                        { 'icon-play--outline': !isplayMusic },
                    ]"
                    @click="playMusic()"
                ></span>
                <!-- <span
                    :class="[
                        'iconfont',
                        { 'icon-ico_zanting_xuanzhong': isplayMusic },
                        { 'icon-bofang': !isplayMusic },
                    ]"
                    @click="playMusic()"
                ></span> -->
                <span
                    class="iconfont icon-gengduo2"
                    @click="isShowplaylist = true"
                ></span>
                <audio
                    ref="audio"
                    hidden
                    autoplay
                    controls
                    :src="songUrl"
                    @ended="palyEnd"
                    @timeupdate="timeupdateFun"
                ></audio>
            </div>
        </div>
        <!-- 播放列表 -->
        <transition name="fullscreen">
        <div class="playmusiclist" v-if="isShowplaylist">
            <div class="playmusiclist-contain">
                <h3>
                    当前播放<span>({{ this.playlist.length }})</span>
                </h3>
                <div class="playmusiclist-top">
                    <div>
                        <span class="iconfont icon-xunhuanbofang"></span
                        >&nbsp;&nbsp;循环播放
                    </div>
                    <div class="delete-all">
                        <span @click="delPlayAll" class="iconfont icon-laji"></span>
                    </div>
                </div>
                <div class="contain">
                    <ul>
                        <li
                            class="playmusiclist-item"
                            v-for="(item, index) in playlist"
                            :key="index"
                        >
                            <div class="play-icon" v-show="item.id == playid">
                                <span></span>
                            </div>
                            <div class="title" @click="editPlayId(item.id)">
                                <p class="musicname">{{ item.name }}</p>
                                <p class="author">
                                    <span
                                        v-for="(val, i) in item.ar"
                                        :key="i"
                                        >{{ val.name }}</span
                                    >
                                </p>
                            </div>
                            <div class="delete-icon">
                                <span @click="delPlayId(item.id)" class="iconfont icon-chuyidong"></span>
                            </div>
                        </li>
                    </ul>
                    <div class="playlist-close" @click="isShowplaylist = false">
                        <span>关闭</span>
                    </div>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
import { getSongDetail, getSong, getLyrics } from "../../api/getsong";
import { getplaylistDetail } from "../../api/toplist";
import { getArtistSong } from "../../api/artistsong";
import { sendlikemisic, getLikelist } from "../../api/base";
export default {
    data() {
        return {
            songdata: [], // 单个歌曲详情信息
            showPlay: false, //是否展示播放音乐全屏界面
            songUrl: null, // 播放音乐链接
            isplayMusic: true, // 标注是否播放音乐
            value: null, // 歌曲播放进度
            duration: null, // 歌曲当前时间
            currentTime: null, // 歌曲总时间
            playType: 0, // 播放格式，0为循环播放，1为单曲播放，2为随机播放
            playlist: [], // 播放列表id
            isShowplaylist: false, // 是否展示播放列表
            isShowLyrics: false, // 显示和隐藏歌词
            lyrics: [], // 处理后歌词列表
            lyricsIndex: null, // 歌词播放语句单前的index
            lyricTop: "170px", // 歌词初始化top值
            falg: true, // 拖动滑块
            like: false, // 是否喜欢该音乐
            likelist: [], // 喜欢音乐列表
        };
    },
    props: ["playid", "playlistId"],
    methods: {
        // 获取喜欢音乐的列表
        getLikelistFun() {
            let uid = window.localStorage.getItem("uid");
            let cookie = window.localStorage.getItem("cookie");
            let t = new Date().getTime();
            getLikelist({ uid: uid, cookie: cookie,t:t }).then((data) => {
                this.likelist = data.ids;
            });
        },
        // 是否喜欢音乐 like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
        sendlikemisicFun() {
            let cookie = window.localStorage.getItem("cookie");
            let t = new Date().getTime();
            // 喜欢音乐点赞前状态取反
            let likeStatus = !this.like;
            // let d = new Date().valueOf();
            sendlikemisic({
                id: this.playid,
                like: likeStatus,
                cookie: cookie,
                t:t
            }).then((data) => {
                // 返回成功修改本地数据，不再向服务器请求更新后喜欢歌曲列表
                if (data.code == 200) {
                    // 返回成功状态在本地修改数据, 1、喜欢状态修改；2、喜欢音乐列表修改
                    if (likeStatus == false) { //修改前为喜欢，改为不喜欢
                        this.like = false;
                        let index = this.likelist.findIndex((item) => {
                            return item == this.playid;
                        });
                        this.likelist.splice(index, 1);
                    }else if(likeStatus == true){
                        this.like = true;
                        this.likelist.push(this.playid)
                    }
                }
            });
        },
        // 获取歌曲详情信息
        getSongDetailFun() {
            let cookie = window.localStorage.getItem("cookie");
            let t = new Date().getTime();
            getSongDetail({ ids: this.playid, cookie:cookie,t:t }).then((data) => {
                this.songdata = data.songs[0];
                // 添加播放音乐到播放列表
                let index = this.playlist.findIndex((item) => {
                    return item.id == this.playid;
                });
                if (index == -1) {
                    this.playlist.push(this.songdata);
                }
                console.log(this.songdata);
            });
        },
        // 获取歌曲播放url
        getSongFun() {
            let cookie = localStorage.getItem("cookie");
            getSong({ id: this.playid,cookie:cookie }).then((data) => {
                this.songUrl = data.data[0].url;
            });
        },
        // 获取歌词
        getLyricsFun() {
            getLyrics({ id: this.playid }).then((data) => {
                this.formatLyric(data.lrc.lyric); // 调用处理歌词数据结构函数
            });
        },
        // 处理歌词数据结构
        formatLyric(str) {
            let strList = [];
            strList = str.split("\n");
            strList = strList.filter(function (s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
            });
            strList.forEach((item) => {
                // console.log(timeAndlyric[0].match(/\d{2}:\d{2}.\d{3}/g));
                let timeStr = item
                    .match(/\d{2}:\d{2}.\d{1,5}/g)
                    .join("")
                    .split(":");
                let time = timeStr[0] * 60 + Math.ceil(timeStr[1]);
                let text = item.split("]")[1];
                // console.log(time,text);
                if (time && text) {
                    this.lyrics.push({ time, text });
                }
            });
        },
        // 监测进度条数据变化，改变歌词位置
        lyricInput() {
            this.falg = false;
            let len = this.lyrics.length;
            let curTime = parseInt((this.value * this.duration) / 100);
            for (let i = 0; i < len; i++) {
                // console.log(this.currentTime);
                // console.log(parseInt(this.currentTime)==this.lyrics[5].time);
                if (this.lyrics[i].time == curTime) {
                    this.lyricTop = 170 - 30 * i + "px";
                    this.lyricsIndex = i;
                    break;
                }
            }
        },

        // 控制音乐播放暂停
        playMusic() {
            // console.log("a");
            if (this.isplayMusic) {
                this.$refs.audio.pause();
            } else {
                this.$refs.audio.play();
            }
            this.isplayMusic = !this.isplayMusic;
        },
        // 监测音频播放更新时间
        timeupdateFun() {
            if(this.$refs.audio.duration){
                this.duration = this.$refs.audio.duration;
                this.currentTime = this.$refs.audio.currentTime;
            }
        },
        // 改变进度条触发事件，改变当前时间
        changeProgress() {
            this.$refs.audio.currentTime = (this.value / 100) * this.duration;
            this.falg = true;
        },
        // 音乐播放结束触发函数
        palyEnd() {
            console.log("end");
            this.isplayMusic = false;
            this.value = 0;
            this.nextSong(); // 播放下一首
        },

        // 播放上一首
        preniousSong() {
            // if (this.playlist.length == 0) {
            //     this.isplayMusic = true; // 点击音乐列表自动播放音乐
            //     this.$refs.audio.load();
            //     return;
            // }
            // 查找上一首index
            let index = this.playlist.findIndex(
                (item) => item.id == this.playid
            );
            // 把歌曲id传给父组件在传回来
            if (this.playType == 0) {
                index = index - 1 < 0 ? this.playlist.length - 1 : index - 1;
            } else if (this.playType == 2) {
                index = Math.floor(Math.random() * (this.playlist.length + 1));
                // console.log("index",index);
            } else if (this.playType == 1) {
                this.isplayMusic = true; // 点击音乐列表自动播放音乐
                this.$refs.audio.load();
                // console.log(this.$refs.audio);
            }
            this.$emit("setplay-id", this.playlist[index].id);
        },
        // 播放下一首
        nextSong() {
            // if (this.playlist.length == 0) {
            //     this.isplayMusic = true; // 点击音乐列表自动播放音乐
            //     this.$refs.audio.load();
            //     return;
            // }
            // 查找下一首index
            let index = this.playlist.findIndex((item) => {
                return item.id == this.playid;
            });
            if (this.playType == 0) {
                index = index + 1 >= this.playlist.length ? 0 : index + 1;
            } else if (this.playType == 2) {
                index = Math.floor(Math.random() * (this.playlist.length + 1));
                // console.log("index",index);
            } else if (this.playType == 1) {
                this.isplayMusic = true; // 点击音乐列表自动播放音乐
                this.$refs.audio.load();
                // console.log(this.$refs.audio);
            }
            // 把歌曲id传给父组件在传回来
            this.$emit("setplay-id", this.playlist[index].id);
        },
        // 改变播放类型，循环、单曲循环、随机
        changePlayType() {
            let type = this.playType;
            type += 1;
            type = type > 2 ? 0 : type < 0 ? 3 : type;
            this.playType = type;
            // if(this.playType==1){
            //     this.$refs.audio.loop = true;
            // }else{
            //     this.$refs.audio.loop = false;
            // }
            let message =
                type == 0 ? "循环播放" : type == 1 ? "单曲播放" : "随机播放";
            this.$toast({ message, className: "inexz" });
        },
        // 点击播放列表的歌曲
        editPlayId(id) {
            this.$emit("setplay-id", id);
        },
        // 删除播放列表歌曲
        delPlayId(id){
            let index = this.playlist.findIndex(item=>{
                return item.id == id;
            })
            // 如果删除id为当前播放id，播放下一首
            if(id==this.playid){
                if(this.playlist.length==1){
                    this.$emit("setplay-id",0);
                }else{
                    this.nextSong();
                }
            }
            this.playlist.splice(index,1);
        },
        // 删除所有播放列表
        delPlayAll(){
            this.playlist = [];
            this.$emit("setplay-id",0);
        }
    },
    created() {
        this.getLikelistFun();
    },
    filters: {
        // 音乐播放时间过滤
        playTime(val) {
            let m = parseInt(val / 60);
            let s = parseInt(val % 60);
            // console.log("a",m, s);
            if (!val) {
                return "0:00";
            } else {
                s = s < 10 ? "0" + s : s;
                return m + ":" + s;
            }
        },
    },
    watch: {
        // 监测playid是否改变，改变切换音乐
        playid() {
            if(this.playid){
                this.getSongDetailFun(); // 获取歌曲详情
                this.getSongFun(); //
                this.isplayMusic = true; // 点击音乐列表自动播放音乐
    
                // 判断是否已喜欢该歌曲
                let s = this.likelist.findIndex((item) => {
                    return item == this.playid;
                });
                this.like = s == -1 ? false : true; // 是否喜欢该音乐
    
                this.lyrics = [];
                this.getLyricsFun(); // 获取歌词
            }
        },
        currentTime() {
            // 监听播放时间，改变进度条值
            if (this.duration != 0) {
                this.value = (this.currentTime / this.duration) * 100;
            }
            // 监听播放时间，改变歌词进度
            let len = this.lyrics.length;
            for (let i = 0; i < len; i++) {
                if (this.lyrics[i].time == parseInt(this.currentTime)) {
                    this.lyricTop = 170 - 30 * i + "px";
                    this.lyricsIndex = i;
                    break;
                }
            }
        },
        // 监测playlistId，获取播放列表
        playlistId() {
            if (this.$route.query.type == 0) {
                getplaylistDetail({ id: this.playlistId }).then((data) => {
                    this.playlist = data.playlist.tracks;
                });
            } else if (this.$route.query.type == 1) {
                getArtistSong({ id: this.$route.query.id }).then((data) => {
                    this.playlist = data.songs;
                });
            }
        },
    },
    mounted() {},
};
</script>
<style lang="less">
.fullscreen-enter {
  animation: go-in 0.5s ease;
}
.fullscreen-leave {
  animation: go-out 0.5s ease forwards;
}
.fullscreen-enter-active {
  animation: go-in 0.5s ease;
}
.fullscreen-leave-active {
  animation: go-out 0.5s ease forwards;
}

@keyframes go-in {
  0% {
    transform: translate(0, 100%);

    opacity: 1;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes fullscreen-dialog-fade-out {
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(0, 100%);
    opacity: 1;
  }
}
.icon-aixin3{
    color: red !important;
}
.inexz {
    z-index: 10001 !important;
}
.miniplaymusic {
    position: fixed;
    background-color: #fff;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    height: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 14px 0px 18px;
    box-sizing: border-box;
    box-shadow: 0px 0px 3px 0px #9998;
    z-index: 10;
    .left {
        display: flex;
        .user-icon {
            width: 39px;
            height: 39px;
            border-radius: 50%;
            background-color: #ccc;
            overflow: hidden;
            margin-right: 10px;
            img {
                width: 100%;
                height: 100%;
                animation: move 30s linear;
                animation-iteration-count: 30;
            }
        }
        .desc {
            h3 {
                font-size: 14px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h4 {
                margin-top: 2px;
                font-size: 12px;
                color: #616363;
                font-weight: normal;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
    .right {
        display: flex;
        span {
            margin-left: 4px;
            line-height: 54px;
        }
        .iconfont {
            font-size: 28px;
            color: #666;
        }
        .icon-gengduo2 {
            font-size: 36px;
        }
    }
}
.pause {
    // animation: move 30s linear;
    // animation-iteration-count: 30;
    animation-play-state: paused !important;
}
@keyframes move {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
    0% {
        transform: rotate(0);
    }
}
.entermusic {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background-color: #8d8783;
    // background-image: radial-gradient(#6b6b6b, #888484, #808080);
    background-image: radial-gradient(#676767, #919191, #afafaf);
    z-index: 999;
    .header1 {
        width: 100%;
        color: #fff;
        .btn {
            position: absolute;
            top: 14px;
            left: 14px;
            .iconfont {
                color: #fff;
                font-size: 22px;
            }
        }
        .title {
            width: 100%;
            text-align: center;
            height: 52px;
            h3 {
                margin-top: 10px;
            }
            h4 {
                margin-top: 6px;
            }
        }
    }
    .content {
        width: 100%;
        height: 400px;
        margin: 30px 0;
        position: relative;
        overflow: hidden;
        .imgbox {
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            width: 230px;
            height: 230px;
            border: 18px solid #9e9893;
            background-color: palegoldenrod;
            border-radius: 50%;
            margin: auto;
            // margin-top: 60px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 110%;
                height: 110%;
                height: auto;
                animation: move 30s linear;
                animation-iteration-count: 30;
            }
        }
        .lyrics {
            width: 100%;
            position: relative;
            .bg {
                position: absolute;
                width: 200%;
                height: 400px;
                top: 0;
                left: 0;
                // background-image: radial-gradient(#fff3, #ccc3);
                z-index: 9999999;
            }
            ul {
                position: absolute;
                left: 0;
                right: 0;
                margin: auto;
                transition: all 1s;
                li {
                    text-align: center;
                    height: 30px;
                    line-height: 30px;
                    color: #ccc;
                    &.con {
                        font-size: 18px;
                        color: #fff;
                    }
                }
            }
        }
    }
    .control {
        width: 100%;
        position: absolute;
        bottom: 0;
        .top {
            display: flex;
            justify-content: space-between;
            height: 30px;
            padding: 0 26px;
            span {
                position: relative;
                top: -6.5px;
                flex: 0 0 56px;
                text-align: center;
            }
            .custom-button {
                width: 6px;
                height: 6px;
                border: 5px solid #fff;
                background-color: #ee0a24;
                border-radius: 50%;
            }
            span {
                // flex:0 0 40px;
                align-items: center;
            }
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            padding: 0 42px;
            height: 82px;
            line-height: 40px;
            .iconfont {
                font-size: 28px;
                color: #fff;
            }

            li:nth-child(3) {
                .iconfont {
                    font-size: 40px !important;
                }
            }
        }
    }
}
.playmusiclist {
    // display: none;
    position: fixed;
    width: 100%;
    // height: 70%;
    height: 300px;
    // top: 40%;
    // height: 100%;
    bottom: 0;
    z-index: 999;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px 15px 0 15px;
    box-sizing: border-box;
    // .playmusiclist-contain{
    //     height: 300px;
    // }
    h3 {
        span {
            font-size: 12px;
            padding: 0 6px;
            color: #999;
        }
    }
    .playmusiclist-top {
        display: flex;
        justify-content: space-between;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        .delete-all {
            flex: 0 0 40px;
            text-align: center;
        }
        .iconfont {
            font-size: 14px;
        }
    }
    .contain {
        // overflow: hidden;
        overflow-y: scroll;
        width: 100%;
        height: 240px;
        .playmusiclist-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 53px;
            line-height: 53px;
            border-bottom: 1px solid #ccc4;
            .play-icon {
                flex: 0 0 30px;
                span {
                    display: block;
                    width: 15px;
                    height: 15px;
                    background: url(../../assets/img/d726f57.gif) no-repeat 0 0 /
                        contain;
                    margin: 0 auto;
                }
            }
            .delete-icon {
                flex: 0 0 40px;
                text-align: center;
                color: #d44439;
            }
            .title {
                flex: 1;
                .musicname {
                    // display: inline-block;
                    height: 22px;
                    line-height: 22px;
                    overflow: hidden;
                    // line-height: 22px;
                }
                .author {
                    // display: inline-block;
                    font-size: 13px;
                    height: 22px;
                    line-height: 22px;
                    color: #666;
                    overflow: hidden;
                }
            }
        }
        .playlist-close {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 43px;
            line-height: 43px;
            width: 100%;
            padding: 0 15px;
            box-sizing: border-box;
            text-align: center;
            background-color: #fff;
            span {
                box-shadow: 0px -1px 0px 0px #ccc5;
                display: block;
                height: 43px;
            }
        }
    }
}
</style>