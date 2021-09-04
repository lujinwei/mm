<template>
    <div class="mvlistbox" ref="mvlists">
        <ul>
            <li class="item" v-for="(item, index) in mvlistData" :key="index">
                <div class="mv-item">
                    <div
                        class="mv-bg"
                        v-show="item.id != playMvId"
                        @click="playMv(item.id, index)"
                    >
                        <img :src="item.cover" />
                        <div class="play-btn">
                            <span class="iconfont icon-bofang"></span>
                        </div>
                    </div>
                    <div
                        class="mv-box"
                        v-show="item.id == playMvId"
                        @click="stopMv(index)"
                    >
                        <video
                            :ref="'video' + index"
                            controls
                            :src="item.mvurl"
                            @loadeddata="loadeddataFun($event)"
                        ></video>
                    </div>
                </div>
                <router-link tag="div" :to="'/mvlist/mv?id='+item.id"><p>{{ item.name }}</p></router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { getMvList, getMvUrl } from "../api/mvlist";
export default {
    data() {
        return {
            mvlistData: [],
            playMvId: null,
            offset: 0, // mv视频列表偏移量
            playNum: null,
            flag:true,
        };
    },
    methods: {
        getMvListDataFun() {
            getMvList({ limit: 5, offset: this.offset }).then((data) => {
                this.mvlistData = data.data;
                console.log("list",this.mvlistData);
                // console.log(this.mvlistData);
            });
        },
        getMvDataFun() {
            getMvUrl({ id: this.playMvId}).then((data) => {
                this.mvlistData[this.playNum].mvurl = data.data.url;
                console.log(this.playMvId, this.playNum);
                console.log(this.mvlistData[this.playNum]);
                this.$set(
                    this.mvlistData[this.playNum],
                    "mvurl",
                    data.data.url
                );
            });
        },
        // 点击播放mv
        playMv(id, index) {
            this.playMvId = id;
            this.playNum = index;
            console.log(id,index);
            this.getMvDataFun();
        },
        // 播放mv
        loadeddataFun(event) {
            event.target.play();
        },
        // stopMv停止播放
        stopMv(index) {
            console.log(index);
            this.$refs["video" + this.playNum][0].pause();
            this.playNum = null;
        },
        // 添加数据
        addData() {
            if (this.flag) {
                this.flag = false;
                this.offset += 5;
                getMvList({ limit: 5, offset: this.offset }).then((data) => {
                    this.mvlistData = this.mvlistData.concat(data.data);
                    this.flag = true;
                });
            }
        },
        // 滚动条监听
        handleScroll() {
            let scrollTop =
                window.pageXOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop; // 滚动条事件
            // console.log(this.$refs);
            let lis = this.$refs.mvlists.getElementsByTagName("li");
            let num = lis.length;
            let liHeight = lis[num - 3].offsetTop;
            // console.log(liHeight, scrollTop);
            if (scrollTop > liHeight) {
                this.addData();
            }
        },
    },
    created() {
        this.getMvListDataFun();
    },
    mounted() {
        this.$nextTick(() => {
                window.addEventListener("scroll", this.handleScroll);
        });
    },
    beforeDestroy(){
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>
<style lang="less">
.mvlistbox {
    margin-top: 80px;
    .mv-item {
        width: 100%;
        height: 210px;
        position: relative;
        .mv-bg {
            position: absolute;
            width: 100%;
            height: 210px;
            img {
                width: 100%;
                height: 100%;
            }
            .play-btn {
                width: 48px;
                height: 48px;
                position: absolute;
                left: 0;
                right: 0;
                margin: auto;
                top: 50%;
                transform: translateY(-50%);
                text-align: center;
                border-radius: 50%;
                line-height: 48px;
                .iconfont {
                    font-size: 38px;
                    color: #fff;
                }
            }
        }
        .mv-box {
            width: 100%;
            height: 210px;
            position: absolute;
            video {
                height: 100%;
                width: 100%;
                position: absolute;
                top: 0;
            }
        }
    }
    p {
        padding: 5px;
        box-sizing: border-box;
    }
}
</style>