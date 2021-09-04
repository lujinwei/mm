<template>
    <div class="new-album">
        <div class="album-header">
            <div class="back-icon">
                <span
                    @click="$router.go(-1)"
                    class="iconfont icon-fanhui"
                ></span>
            </div>
            <!-- api/blue -->
            <div class="mv-main">
                <video :src="mvUrl" controls></video>
            </div>
            <!-- <div class="album-bg"></div> -->
        </div>
        <div :class="['album-desc']">
            <div :class="['content']">
                <p>简介</p>
                <p>{{ MvDetail.desc }}</p>
            </div>
            <div class="xiala-btn">
                <span class="iconfont icon-xiala"></span>
            </div>
            <ul class="other-info">
                <li>发布时间:{{ MvDetail.publishTime }}</li>
                <li>播放:{{ MvDetail.playCount | playCountFilters }}</li>
            </ul>
        </div>
        <div class="album-songlist">
            <!-- <h5>歌单列表</h5> -->
        </div>
        <div class="comment-good">
            <h5>精彩评论</h5>
            <ul>
                <li
                    class="item"
                    v-for="(item, index) in mvComment.hotComments"
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
                            @click="likeComment(item.commentId, 1, index)"
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
    </div>
</template>
<script>
import { getMvUrl, getMvDetail, getMvComment } from "../../api/mvlist";
import {sendCommentLike} from "../../api/albumlist";
export default {
    data() {
        return {
            mvUrl: "", // mv播放url
            MvDetail: "", // mv详情
            // mv评论
            mvComment: {
                comments: [
                    {
                        user: { avatarUrl: null },
                        liked: "",
                    },
                ],
                hotComments: [
                    {
                        user: { avatarUrl: null },
                        liked: "",
                    },
                ],
            }, //专辑评论数据
        };
    },
    methods: {
        // 获取播放链接
        getMvUrlFun() {
            getMvUrl({ id: this.$route.query.id }).then((data) => {
                this.mvUrl = data.data.url;
            });
        },
        // 获取播放详情
        getMvDetailFun() {
            getMvDetail({ mvid: this.$route.query.id }).then((data) => {
                this.MvDetail = data.data;
            });
        },
        // 获取评论
        getMvCommentFun() {
            let cookie = localStorage.getItem("cookie");
            let time = new Date().valueOf();
            getMvComment({ id: this.$route.query.id,cookie:cookie,time:time }).then((data) => {
                this.mvComment = data;
                console.log(this.mvComment);
            });
        },
        // 点赞评论
        likeComment(commentId, i, index) {
            // ```
            // commentId：评论id
            // i：评论类型（热门评论、最新评论）
            // index：评论列表当前的索引
            // ```
            console.log(commentId, i, index);
            let cookie = localStorage.getItem("cookie");
            let time = new Date().valueOf();
            // console.log("cid",commentId,"id",this.$route.query.id,i);
            // 给评论点赞
            if (i == 1) {
                //精选评论
                let t = this.mvComment.hotComments[index].liked == true ? 0 : 1; // 当前状态为true是，发送取消点赞，否则发送点赞
                sendCommentLike({
                    id: parseInt(this.$route.query.id),
                    cid: commentId,
                    t: t,
                    type: 1,
                    cookie: cookie,
                    time: time,
                }).then((data) => {
                    console.log(data);
                    if (data.code != 200) {
                        return;
                    }
                    if (t == 1) {
                        //点赞
                        this.$set(
                            this.mvComment.hotComments[index],
                            "liked",
                            true
                        );
                        let likedCount =
                            this.mvComment.hotComments[index]
                                .likedCount + 1;
                        this.$set(
                            this.mvComment.hotComments[index],
                            "likedCount",
                            likedCount
                        );
                    } else if (t == 0) {
                        // 取消点赞
                        this.$set(
                            this.mvComment.hotComments[index],
                            "liked",
                            false
                        );
                        let likedCount =
                            this.mvComment.hotComments[index]
                                .likedCount - 1;
                        this.$set(
                            this.mvComment.hotComments[index],
                            "likedCount",
                            likedCount
                        );
                    }
                });
            }
            if (i == 2) {
                let t = this.mvComment.comments[index].liked == true ? 0 : 1; // 当前状态为true是，发送取消点赞，否则发送点赞
                sendCommentLike({
                    id: parseInt(this.$route.query.id),
                    cid: commentId,
                    t: t,
                    type: 1,
                    cookie: cookie,
                    time: time,
                }).then((data) => {
                    console.log(data);
                    if (data.code != 200) {
                        return;
                    }
                    if (t == 1) {
                        //点赞
                        this.$set(
                            this.mvComment.comments[index],
                            "liked",
                            true
                        );
                        let likedCount =
                            this.mvComment.comments[index].likedCount +
                            1;
                        this.$set(
                            this.mvComment.comments[index],
                            "likedCount",
                            likedCount
                        );
                    } else if (t == 0) {
                        // 取消点赞
                        this.$set(
                            this.mvComment.comments[index],
                            "liked",
                            false
                        );
                        let likedCount =
                            this.mvComment.comments[index].likedCount -
                            1;
                        this.$set(
                            this.mvComment.comments[index],
                            "likedCount",
                            likedCount
                        );
                    }
                });
            }
        },
    },
    created() {
        // console.log(this.$route.query.id);
        this.getMvUrlFun();
        this.getMvDetailFun();
        this.getMvCommentFun();
    },
    filters: {
        // 推荐歌单数量过滤
        playCountFilters(val) {
            // console.log(val);
            let w = val > 10000 ? val / 10000 : val;
            let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万";
            return y;
        },
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
    // 收藏信息
    .other-info {
        display: flex;
        justify-content: start;
        padding-bottom: 10px;
        // height: 30px;
        // line-height: 30;
        li {
            text-align: center;
            margin-right: 10px;
            font-size: 13px;
            color: #666;
            .icon-shoucangbeifen {
                font-size: 14px;
                margin-right: 3px;
            }
            .red {
                color: #df0000;
                font-size: 14px;
                margin-right: 3px;
            }
        }
    }
    .album-header {
        // height: 186px;
        width: 100%;
        position: relative;
        overflow: hidden;
        align-items: center;
        .back-icon {
            z-index: 9;
            position: absolute;
            top: 8px;
            color: #fff;
            left: 8px;
        }
        .mv-main {
            width: 100%;
            height: auto;
            video {
                width: 100%;
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