<template>
    <div class="toplist">
        <div class="item" v-for="(item, index) in toplistData" :key="index">
            <div class="img-box">
                <router-link :to="'/toplist/ranklist?id='+item.id+'&type=0'"><img :src="item.coverImgUrl" /></router-link>
            </div>
            <ul class="detail">
                <li v-for="(val, i) in item.tracks.slice(0, 3)" :key="i">
                    {{ i + 1 }}.{{ val.name }} - {{ val.ar[0].name }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { getToplist, getplaylistDetail } from "../api/toplist";
export default {
    data() {
        return {
            toplistData: [], // 排行榜数据
        };
    },
    // 组件路由最早钩子
    beforeRouteEnter(to, from, next) {
        // 获取排行榜数据
        getToplist().then(data => {
            // 获取排行榜详情数据 
            next(vm => vm.getplaylistDetailFun(data.list));
        });
    },
    methods: {
        // 获取排行榜详情数据 
        getplaylistDetailFun(data) {
            for (let i = 0; i < data.length; i++) {
                getplaylistDetail({id:data[i].id}).then((data) => {
                    if(data){
                        this.toplistData.push(data.playlist);
                    }
                });
            }
        },
    },
    

    created() {
        // 方法一：请求排行榜列表数据，两层接口
        // getToplist().then((data) => {
        //     for (let i = 0; i < data.list.length; i++) {
        //         getplaylistDetail(id:data.list[i].id).then((data) => {
        //             // console.log(data);
        //             this.toplistData.push(data.playlist);
        //         });
        //     }
        // });
    },
};
</script>
<style lang="less">
.toplist {
    margin-top: 85px;
    .item {
        margin: 0px 8px;
        padding: 2px 0px;
        border-bottom: 1px solid #e1e2e2;
        height: 90px;
        display: flex;
        .img-box {
            flex: 0 0 90px;
            margin-right: 18px;
            background-color: chocolate;
            width: 90px;
            height: 90px;
            border-radius: 2px;
            img {
                // display: block;
                width: 90px;
                height: 90px;
            }
        }
        ul.detail {
            flex: 1;
            height: 90px;
            margin-top: 4px;
            li {
                height: 27px;
                line-height: 27px;
                font-size: 12px;
                color: #1b1b28;
                overflow: hidden;
            }
        }
    }
}
</style>