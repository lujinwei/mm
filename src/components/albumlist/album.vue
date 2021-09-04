<template>
    <div class="new-album" v-if="albumData">
        <div class="album-header">
            <div class="back-icon">
                <span
                    @click="$router.go(-1)"
                    class="iconfont icon-fanhui"
                ></span>
            </div>
            <!-- api/blue -->
            <div
                class="album-bg"
                :style="{
                    background:
                        'url(//music.163.com/api/img/blur/' +
                        albumData.album.picId +
                        ') no-repeat 50% 50%/cover',
                }"
            ></div>
            <!-- <div class="album-bg"></div> -->
            <div class="img-box">
                <img :src="albumData.album.picUrl" />
            </div>
            <div class="message">
                <h3 class="title">{{ albumData.album.name }}</h3>
                <p class="author">
                    歌手:<span>{{ albumData.album.artist.name }}</span>
                </p>
                <p class="time">
                    发行时间:&nbsp;{{
                        albumData.album.publishTime | timeFilter
                    }}
                </p>
            </div>
        </div>
        <div :class="['album-desc']">
            <div :class="['content', { 'alubum-hide3': ishsowdesc }]">
                <p>简介</p>
                <span
                    v-for="(val, i) in albumData.album.description.split('\n')"
                    :key="i"
                    >{{ val }}<br
                /></span>
            </div>
            <div class="xiala-btn">
                <span
                    class="iconfont icon-xiala"
                    @click="ishsowdesc = !ishsowdesc"
                ></span>
            </div>
            <ul class="other-info">
                <!-- <li><span class="iconfont icon-dianzan"></span>点赞(0)</li> -->
                <li @click="likealbumFun">
                    <span
                        :class="[
                            'iconfont',
                            'icon-shoucangbeifen',
                            { red: albumOtherInfoData.isSub },
                        ]"
                    ></span
                    >收藏({{ albumOtherInfoData.subCount }})
                </li>
                <li>
                    <span class="iconfont icon-zhuanfa1"></span>分享({{
                        albumOtherInfoData.shareCount
                    }})
                </li>
                <li>
                    <span class="iconfont icon-pinglun1"></span>评论({{
                        albumOtherInfoData.commentCount
                    }})
                </li>
            </ul>
        </div>
        <div class="album-songlist">
            <h5>歌单列表</h5>
            <ul>
                <li
                    class="item"
                    v-for="(item, index) in albumData.songs"
                    :key="index"
                >
                    <div class="index">{{ index + 1 }}</div>
                    <div class="title">
                        <h4>{{ item.name }}</h4>
                        <p>{{ item.ar[0].name }}</p>
                    </div>
                    <div class="play-btn" @click="setPlayId(item.id)">
                        <span class="iconfont icon-play--outline"></span>
                        <!-- <span class="iconfont icon-bofang"></span> -->
                    </div>
                </li>
            </ul>
        </div>
        <div class="comment-good">
            <h5>精彩评论</h5>
            <ul>
                <li
                    class="item"
                    v-for="(item, index) in AlbumCommentData.hotComments"
                    :key="index"
                >
                    <div class="user-img">
                        <div class="img-box">
                            <img :src="item.user.avatarUrl" />
                        </div>
                    </div>
                    <div class="content">
                        <p class="author">{{ item.user.nickname }}</p>
                        <p class="time">{{ item.time | timeFilter }}</p>
                        <p class="main">{{ item.content }}</p>
                        <div
                            class="good"
                            @click="likeAlbumComment(item.commentId, 1, index)"
                        >
                            {{ item.likedCount
                            }}<span
                                :class="[
                                    'iconfont',
                                    'icon-dianzan',
                                    { iconfont1: item.liked },
                                ]"
                            ></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="comment-good">
            <h5>最新评论</h5>
            <ul>
                <li
                    class="item"
                    v-for="(item, index) in AlbumCommentData.comments"
                    :key="index"
                >
                    <div class="user-img">
                        <div class="img-box">
                            <img :src="item.user.avatarUrl" />
                        </div>
                    </div>
                    <div class="content">
                        <p class="author">{{ item.user.nickname }}</p>
                        <p class="time">{{ item.time | timeFilter }}</p>
                        <p class="main">{{ item.content }}</p>
                        <div
                            class="good"
                            @click="likeAlbumComment(item.commentId, 2, index)"
                        >
                            {{ item.likedCount
                            }}<span
                                :class="[
                                    'iconfont',
                                    'icon-dianzan',
                                    { iconfont1: item.liked },
                                ]"
                            ></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="sendComment">
            <div class="inp">
                <input type="text" v-model="commentValue">
            </div>
            <div class="btn">
                <button @click="sendCommentFun">发送</button>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getAlbum,
    getAlbumComment,
    getAlbumOtherInfo,
    albumSub,
    sendCommentLike,
    sendComment
} from "../../api/albumlist";
export default {
    data() {
        return {
            ishsowdesc: true, // 专辑描述是否展示全部
            albumData: null, // 专辑信息
            bgImg: "",
            AlbumCommentData: {
                comments:[
                    {
                        user:{avatarUrl:null},
                        liked: ""
                    }
                ],
                hotComments: [
                    {
                        user: { avatarUrl: null},
                        liked: ""
                    },
                ],
            }, //专辑评论数据
            albumOtherInfoData: { subCount: 0 }, // 专辑其他信息，点赞收藏
            commentValue:"",
        };
    },
    methods: {
        sendCommentFun(){
            let cookie = window.localStorage.getItem("cookie");
            let time = new Date().valueOf();
            if(this.commentValue==null){
                return;
            }
            sendComment({
                id:this.$route.query.id, //对应资源 id
                content:this.commentValue, //要发送的内容
                t:1, // 1 发送, 2 回复
                type:3, //为专辑
                cookie:cookie,
                time:time
            }).then(data=>{
                console.log(data);
                this.commentValue = ""
            })
        },
        // 点赞（取消）专辑评论 /comment/like?id=29178366&cid=12840183&t=1&type=0 
        // t : 是否点赞 ,1 为点赞 ,0 为取消点赞
        likeAlbumComment(commentId,i,index) {
            let cookie = localStorage.getItem("cookie");
            let time = new Date().valueOf();
            // console.log("cid",commentId,"id",this.$route.query.id,i);
            // 给评论点赞
            if(i==1){ //精选评论
                let t = this.AlbumCommentData.hotComments[index].liked == true?0:1; // 当前状态为true是，发送取消点赞，否则发送点赞
                sendCommentLike({
                    id: parseInt(this.$route.query.id),
                    cid: commentId,
                    t: t,
                    type: 3,
                    cookie:cookie,
                    time:time
                }).then((data) => {
                    console.log(data);
                    if(data.code!=200){
                        return;
                    }
                    if(t==1){ //点赞
                        this.$set(this.AlbumCommentData.hotComments[index],"liked",true);
                        let likedCount = this.AlbumCommentData.hotComments[index].likedCount+1;
                        this.$set(this.AlbumCommentData.hotComments[index],"likedCount",likedCount);
                    }else if(t==0){ // 取消点赞
                        this.$set(this.AlbumCommentData.hotComments[index],"liked",false);
                        let likedCount = this.AlbumCommentData.hotComments[index].likedCount-1;
                        this.$set(this.AlbumCommentData.hotComments[index],"likedCount",likedCount);
                    }
                });
            }
            if(i==2){
                let t = this.AlbumCommentData.comments[index].liked == true?0:1; // 当前状态为true是，发送取消点赞，否则发送点赞
                sendCommentLike({
                    id: parseInt(this.$route.query.id),
                    cid: commentId,
                    t: t,
                    type: 3,
                    cookie:cookie,
                    time:time
                }).then((data) => {
                    console.log(data);
                    if(data.code!=200){
                        return;
                    }
                    if(t==1){ //点赞
                        this.$set(this.AlbumCommentData.comments[index],"liked",true);
                        let likedCount = this.AlbumCommentData.comments[index].likedCount+1;
                        this.$set(this.AlbumCommentData.comments[index],"likedCount",likedCount);
                    }else if(t==0){ // 取消点赞
                        this.$set(this.AlbumCommentData.comments[index],"liked",false);
                        let likedCount = this.AlbumCommentData.comments[index].likedCount-1;
                        this.$set(this.AlbumCommentData.comments[index],"likedCount",likedCount);
                    }
                });
            }
        },
        // 收藏专辑
        likealbumFun() {
            let cookie = localStorage.getItem("cookie");
            let time = new Date().valueOf();
            // console.log(this.albumOtherInfoData.isSub);
            let t = this.albumOtherInfoData.isSub == true ? 0 : 1; //1 为收藏,其他为取消收藏
            console.log(t);
            if (t == 1) {
                // 添加收藏
                albumSub({
                    id: this.$route.query.id,
                    t: 1,
                    cookie: cookie,
                    time:time
                }).then((data) => {
                    if (data.code == 200) {
                        this.albumOtherInfoData.isSub = true;
                        this.albumOtherInfoData.subCount += 1;
                    }
                });
            } else if (t == 0) {
                // 取消收藏
                albumSub({
                    id: this.$route.query.id,
                    t: 0,
                    cookie: cookie,
                    time:time
                }).then((data) => {
                    if (data.code == 200) {
                        this.albumOtherInfoData.isSub = false;
                        this.albumOtherInfoData.subCount -= 1;
                    }
                });
            }
        },
        // 播放音乐
        setPlayId(id) {
            this.$emit("setplay-id", id);
        },
        // 获取专辑内容
        getAlbumData() {
            getAlbum({ id: this.$route.query.id }).then((data) => {
                this.albumData = data;
                // this.bgImg = 'background:url(https://p1.music.126.net/nFDeSztp94T2oZlTIzwcWw==/'+this.albumData.album.pic+'.jpg?param=170y170)'
                // console.log(this.albumData);
            });
        },
        // 获取评论信息
        getAlbumCommentFun() {
            let cookie = window.localStorage.getItem("cookie");
            let time = new Date().valueOf();
            getAlbumComment({ id: this.$route.query.id,cookie:cookie,time:time }).then((data) => {
                this.AlbumCommentData = data;
                console.log("评论", this.AlbumCommentData);
            });
        },
        // 获取其他信息（点赞收藏）
        getAlbumOtherInfoFun() {
            let cookie = localStorage.getItem("cookie");
            let time = new Date().valueOf();
            getAlbumOtherInfo({
                id: this.$route.query.id,
                cookie: cookie,
                time:time
            }).then((data) => {
                this.albumOtherInfoData = data;
                // console.log("data=====>",data);
                // console.log("issub===", this.albumOtherInfoData.isSub);
            });
        },
    },
    created() {
        this.getAlbumData();
        this.getAlbumCommentFun();
        this.getAlbumOtherInfoFun();
    },
    filters: {
        // 把时间撮转成时间格式
        timeFilter(val) {
            var time = new Date(val);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            return y + "-" + m + "-" + d;
        },
    },
};
</script>
<style lang="less">
.new-album {
    // 评论框
    .sendComment{
        position: fixed;
        height: 38px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #ccc4;
        background: #fff;
        bottom: 0;
        width: 100%;
        .inp{
            flex: 1;
            input{
                width: 100%;
                text-indent: 5px;
                border: none;
                height: 30px;
                border: 1px solid #9995;
                margin: 0 12px;
                box-sizing: border-box;
                border-radius: 15px;
            }
        }
        .btn{
            flex: 0 0 80px;
            text-align: center;
            button{
                background-color: transparent;
                border: none;
                padding: 3px 10px;
                border-radius: 18px;
                // color: #fff;
            }
        }
    }
    // 收藏信息
    .other-info {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        // height: 30px;
        // line-height: 30;
        li {
            flex: 1;
            text-align: center;
            font-size: 13px;
            color: #666;
            .iconfont {
                font-size: 14px;
                margin-right: 4px;
            }
            // .icon-shoucangbeifen {
            //     font-size: 14px;
            //     margin-right: 3px;
            // }
            .red {
                color: #df0000;
                font-size: 14px;
                margin-right: 3px;
            }
        }
    }
    .album-header {
        height: 186px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        .back-icon {
            z-index: 9;
            position: absolute;
            top: 8px;
            color: #fff;
            left: 8px;
        }
        .album-bg {
            position: absolute;
            width: 100%;
            height: 186px;
            // background: url(../../assets/img/album-bg.jpg);
            filter: blur(20px) !important;
            z-index: 1;
            transform: scale(1.5);
            &::after {
                content: "";
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.25);
            }
        }
        .img-box {
            flex: 0 0 126px;
            width: 126px;
            height: 126px;
            margin: 0 20px;
            // background: chartreuse;
            z-index: 1;
            position: relative;
            img {
                width: 100%;
                height: 100%;
            }
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                padding-left: 115%;
                bottom: 0;
                z-index: -1;
                // background: violet;
                background: url(../../assets/img/album@2x.png) no-repeat 0 0 /
                    cover;
                margin: auto;
            }
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
        .message {
            flex: 1;
            height: 126px;
            padding-left: 10px;
            z-index: 1;
            padding-right: 10px;
            box-sizing: border-box;
            h3 {
                max-width: 200px;
                font-size: 18px;
                color: #fff;
                padding-top: 10px;
                word-break: keep-all;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .author {
                color: #ccc;
                padding-top: 22px;
                span {
                    color: #fff;
                    font-size: 16px;
                    margin-left: 10px;
                }
            }
            .time {
                padding-top: 8px;
                font-size: 14px;
                color: #ccc;
            }
        }
    }
    .album-desc {
        padding: 10px 10px 0px 15px;
        // overflow: hidden;
        transition: all 2s;
        .content {
            transition: all 2s;
        }
        .xiala-btn {
            position: relative;
            height: 24px;
            transition: all 2s;
            .icon-xiala {
                position: absolute;
                color: #ccc;
                top: 0;
                right: 0;
            }
        }
    }
    // 是否显示隐藏三行
    .alubum-hide3 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .album-songlist {
        h5 {
            padding: 0 10px;
            height: 24px;
            line-height: 24px;
            font-weight: normal;
            color: #666;
            background-color: #eeeff0;
        }
        .item {
            display: flex;
            height: 56px;
            align-items: center;
            justify-content: space-between;
            .index {
                flex: 0 0 40px;
                text-align: center;
                line-height: 56px;
            }
            .title {
                flex: 1;
                h4 {
                    font-size: 16px;
                }
                p {
                    font-size: 14px;
                    color: #666;
                }
            }
            .play-btn {
                flex: 0 0 40px;
                .iconfont {
                    font-size: 28px;
                    color: #999;
                }
            }
        }
    }
    .comment-good {
        h5 {
            padding: 0 10px;
            height: 24px;
            line-height: 24px;
            font-weight: normal;
            color: #666;
            background-color: #eeeff0;
        }
        .item {
            padding-top: 12px;
            display: flex;
            .user-img {
                flex: 0 0 50px;
                .img-box {
                    width: 30px;
                    height: 30px;
                    background-color: #e43137;
                    margin: 0 auto;
                    margin-top: 6px;
                    border-radius: 50%;
                    overflow: hidden;
                    img {
                        width: 100%;
                    }
                }
            }
            .content {
                flex: 1;
                position: relative;
                border-bottom: 1px solid #ccc5;
                padding-bottom: 10px;
                padding-right: 10px;
                .author {
                    font-size: 14px;
                }
                .time {
                    font-size: 12px;
                    color: #666;
                }
                .main {
                    font-size: 16px;
                    margin: 5px 0;
                    text-align: justify;
                    // padding-right: 10px;
                }
                .good {
                    top: 0;
                    right: 8px;
                    position: absolute;
                    font-size: 12px;
                    color: #ccc;
                    text-align: right;
                    .iconfont {
                        font-size: 16px;
                        // display: inline-block;
                        // vertical-align: middle;
                        margin-left: 5px;
                    }
                    .iconfont1 {
                        color: #df0000;
                    }
                }
            }
        }
    }
}
</style>