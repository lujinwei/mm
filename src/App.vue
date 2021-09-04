<template>
    <div class="box">
        <!-- 引入headerNav组件 -->
        <header-nav v-if="$route.meta.isshow"></header-nav>

        <!-- 路由视图 -->
        <router-view
            @setplay-id="setplayId"
            @get-playlist-id="getPlaylistId"
        ></router-view>

        <!-- 播放音乐组件 -->
        <playmusic
            v-show="playId"
            :playid="playId"
            :playlistId="playlistId"
            @setplay-id="setplayId"
            v-if="!$route.meta.isshowMini"
        ></playmusic>
    </div>
</template>
<script>
import headerNav from "./components/base/headerNav.vue";
import Playmusic from "./components/base/playmusic.vue";
export default {
    components: { headerNav, Playmusic },
    data() {
        return {
            playId: null, // 播放音乐的id
            playlistId: null, // 播放列表
            show: false,
        };
    },
    methods: {
        // 设置播放id
        setplayId(id) {
            this.playId = id;
            // console.log(this.playlist);
        },
        // 获取音乐播放列表
        getPlaylistId(id) {
            this.playlistId = id;
        },
    },
    mounted() {
        // console.log(this);
    },
};
</script>
<style lang="less">
@import "./assets/css/base.css";
// @import "../node_modules/swiper/css/swiper.min.css"
</style>