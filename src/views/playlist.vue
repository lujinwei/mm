<template>
    <div>
        <b-scroll
            v-if="flag"
            :top="'80px'"
            :left="leftList"
            :right="rightList"
        ></b-scroll>
        <van-loading type="spinner" v-if="!flag" color="#D44439" style="text-align:center;margin-top:50px"></van-loading>
    </div>
</template>
<script>
import BScroll from "../components/base/BScroll.vue";
import { hotPlaylist, playlist } from "../api/playlist";
export default {
    data() {
        return {
            leftList: [
                "热",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                // "P",
                // "R",
                // "S",
                // "T",
                // "W",
            ],
            rightList: [
                // {
                //     name:"热",
                //     data:[]
                // }
            ],
            flag: false,
        };
    },
    methods: {
        // 获取热门歌手 /top/artists?offset=0&limit=30
        hotPlaylistFun() {
            hotPlaylist({ offset: 0, limit: 10 }).then((data) => {
                this.rightList.unshift({ name: "热", data: data.artists ,index:0});
            });
        },
        // 获取歌手分类 /artist/list?type=1&area=96&initial=b
        playlistFun() {
            let num = 1;
            for (let i = 1; i < this.leftList.length; i++) {
                playlist({
                    type: 1,
                    area: 96,
                    limit: 10,
                    initial: this.leftList[i],
                }).then((data) => {
                    if(data.code==200){
                        this.rightList.push({
                            name: this.leftList[i],
                            data: data.artists,
                            index: i,
                        });
                        num++;
                        if (num == this.leftList.length) {
                            this.rightList.sort((a, b) => {
                                a = a.index;
                                b = b.index;
                                return a - b;
                            });
                            // console.log(this.rightList);
                            this.flag = true;
                        }
                    }
                    // console.log(this.rightList);
                });
            }
        },
    },
    created() {
        this.hotPlaylistFun();
        this.playlistFun();
    },
    components: { BScroll },
};
</script>
<style lang="less">
</style>