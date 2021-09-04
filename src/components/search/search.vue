<template>
    <div class="search">
        <div class="search-header">
            <div class="back-icon" @click="$router.go(-1)">
                <span class="iconfont icon-fanhui"></span>
            </div>
            <input
                type="text"
                v-model="keyword"
                @keyup="keyupFun($event)"
                class="keyword"
                placeholder="搜索歌曲和歌手"
                @change="getData"
            />
        </div>
        <div class="main">
            <div class="search-content">
                <h4 v-show="keyword">搜索"{{ keyword }}"</h4>
                <!-- 搜索建议 -->
                <ul v-show="this.isSuggest && keyword">
                    <li v-for="(val, i) in SuggestSearchData" :key="i">
                        <span class="iconfont icon-sousuo2"></span>
                        <p @click="clickSearch(val.keyword)">{{ val.keyword }}</p>
                    </li>
                </ul>
            </div>
            <div class="search-hot" v-show="!keyword">
                <h6>热门搜索</h6>
                <ul>
                    <li
                        @click="clickSearch(item.first)"
                        v-for="(item, index) in hotSearchData"
                        :key="index"
                    >
                        {{ item.first }}
                    </li>
                </ul>
            </div>
            <div class="resultlist" v-if="!isSuggest">
                <h6>最佳匹配</h6>
                <div>
                    <router-link
                        :to="'/toplist/singermusic?id='+item.id+'&type=1'"
                        tag="div"
                        class="geshou"
                        v-for="(item, index) in geshou"
                        :key="index"
                    >
                        <div class="user-img">
                            <div class="img-box">
                                <img :src="item.img1v1Url" />
                            </div>
                        </div>
                        <div class="title">歌手:{{ item.name }}</div>
                        <div class="icon">
                            <span class="iconfont icon-gengduo1"></span>
                        </div>
                    </router-link>
                </div>
                <div>
                    <!-- 专辑 -->
                    <router-link
                        tag="div"
                        :to="'/albumlist/album?id='+item.id"
                        class="geshou"
                        v-for="(item, index) in zhuanji"
                        :key="index"
                    >
                        <div class="user-img">
                            <div class="img-box">
                                <img :src="item.picUrl" />
                            </div>
                        </div>
                        <div class="title">
                            <p>专辑:{{ item.name }}</p>
                            <span>{{ item.artist.name }}</span>
                        </div>
                        <div class="icon">
                            <span class="iconfont icon-gengduo1"></span>
                        </div>
                    </router-link>
                </div>
                <div class="danqulist">
                    <ul v-if="zhuanji">
                        <li
                            v-for="(item, index) in searchResultData"
                            :key="index"
                        >
                            <div class="title">
                                <p>{{ item.name }}</p>
                                <span>{{ item.ar[0].name }}</span>
                            </div>
                            <div class="play-icon" @click="setPlayId(item.id)">
                                <span
                                    class="iconfont icon-play--outline"
                                ></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="search-history" v-show="ishidehot">
                <!-- <h6>历史搜索</h6> -->
            </div>
        </div>
    </div>
</template>
<script>
import {
    getHotSearchData,
    getSuggestSearchData,
    getSearchData,
} from "../../api/search";
export default {
    data() {
        return {
            hotSearchData: "",
            keyword: "",
            ishidehot: true,
            SuggestSearchData: "",
            isSuggest: true,
            searchResultData: [],
            geshou: [],
            zhuanji: [],
            isclick: true,
        };
    },
    methods: {
        // 播放音乐
        setPlayId(id){
            this.$emit("setplay-id",id)
        },
        // 热门搜索
        getHotSearchDataFun() {
            getHotSearchData().then((data) => {
                if (data.code == 200) {
                    this.hotSearchData = data.result.hots;
                }
            });
        },
        // 点击热门搜索
        clickSearch(data) {
            this.keyword = data;
            this.isSuggest = false;
            this.isclick = false;
            this.getSearchDataFun();
        },
        // 获取输入框内容
        getData() {
            // console.log(this.keyword);
        },
        keyupFun(e) {
            // this.ishidehot = false;
            if (e.keyCode == 13) {
                //
                // console.log(e);
                this.isSuggest = false;
                this.getSearchDataFun();
            }
        },
        // 搜索建议/search/suggest?keywords= 海阔天空&type=mobile
        getSuggestSearchDataFun() {
            getSuggestSearchData({
                keywords: this.keyword,
                type: "mobile",
            }).then((data) => {
                if (data.result) {
                    // keword变化
                    this.isSuggest = true;
                    this.SuggestSearchData = data.result.allMatch;
                }
            });
        },
        getSearchDataFun() {
            // /cloudsearch?keywords= 海阔天空 type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单
            // 获取搜索单曲
            getSearchData({ keywords: this.keyword, type: 1 }).then((data) => {
                // if(data.result){
                this.searchResultData = data.result.songs;
                // }
            });
            // 获取搜索歌手
            getSearchData({ keywords: this.keyword, type: 100 }).then(
                (data) => {
                    // if(data.result){
                    this.geshou[0] = data.result.artists[0];
                    // }
                }
            );
            // 获取搜索专辑
            getSearchData({ keywords: this.keyword, type: 10 }).then((data) => {
                // if(data.result){
                this.zhuanji[0] = data.result.albums[0];
                // }
            });
        },
    },
    created() {
        this.getHotSearchDataFun();
    },
    watch: {
        keyword() {
            setTimeout(() => {
                // console.log(this.keyword);
                if (this.isclick) {
                    if (this.keyword == "") {
                        this.SuggestSearchData = null;
                    }
                    this.getSuggestSearchDataFun();
                }
                this.isclick = true;
            }, 1);
        },
    },
};
</script>
<style lang="less">
body {
    // background-color: #f2f3f4;
}
.search {
    background-color: #f2f3f4;
    // height: 100%;
    // width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 41px;
    .main {
        overflow-y: scroll;
        background-color: #f2f3f4;
    }
    .search-header {
        position: fixed;
        top: 0;
        width: 100%;
        background-color: #d44439;
        height: 41px;
        display: flex;
        align-items: center;
        .back-icon {
            flex: 0 0 44px;
            text-align: center;
            .iconfont {
                font-size: 18px;
                color: #fff;
                line-height: 41px;
            }
        }
        input {
            margin-right: 20px;
            background-color: #d44439;
            flex: 1;
            border: none;
            color: #fff;
            line-height: 24px;
            border-bottom: 1px solid #e2a29d;
            &::-webkit-input-placeholder {
                color: #f4cecd;
                font-size: 14px;
            }
            &:-moz-placeholder {
                color: #f4cecd;
                font-size: 14px;
            }
            &::-moz-placeholder {
                color: #f4cecd;
                font-size: 14px;
            }
            &:-ms-input-placeholder {
                color: #f4cecd;
                font-size: 14px;
            }
        }
    }
    .search-hot {
        margin-top: 8px;
        padding: 0 21px;
        h6 {
            height: 32px;
            color: #919293;
        }
        ul {
            display: flex;
            flex-wrap: wrap;
        }
        li {
            height: 25px;
            line-height: 25px;
            border: 1px solid #dbdcdd;
            border-radius: 5px;
            margin-right: 6px;
            padding: 0 5px;
            margin-bottom: 8px;
        }
    }
    .search-history {
        padding: 0 21px;
        h6 {
            height: 32px;
            line-height: 32px;
            color: #919293;
        }
    }
    .search-content {
        padding: 0 10px;
        h4 {
            height: 44px;
            line-height: 44px;
            color: #507daf;
            border-bottom: 1px solid #ccc8;
        }
        ul {
            li {
                height: 38px;
                line-height: 38px;
                display: flex;
                span {
                    flex: 0 0 30px;
                }
                p {
                    width: 100%;
                    border-bottom: 1px solid #ccc4;
                }
            }
        }
    }
    .resultlist {
        padding: 0 10px;
        .geshou {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ccc5;
            height: 48px;
            .user-img {
                flex: 0 0 40px;
                width: 36px;
                height: 36px;
                margin-right: 10px;
                // background-color: red;
                img {
                    width: 100%;
                }
            }
            .title {
                flex: 1;
                span {
                    font-size: 12px;
                    color: #999;
                }
            }
            .icon {
                flex: 0 0 20px;
            }
        }
        .danqulist {
            ul {
                li {
                    display: flex;
                    height: 48px;
                    align-items: center;
                    border-bottom: 1px solid #ccc5;
                    .title {
                        flex: 1;
                        span {
                            font-size: 12px;
                            color: #999;
                        }
                    }
                    .play-icon {
                        flex: 0 0 40px;
                        .iconfont {
                            font-size: 26px;
                            color: #999;
                        }
                    }
                }
            }
        }
    }
}
</style>