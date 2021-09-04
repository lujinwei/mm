<template>
    <div ref="tabbox" class="square">
        <div class="box">
            <div class="header">
                <!-- <router-link to="/">
                    <span class="icon-back cm-header-icon fl"></span>
                </router-link> -->
                <span @click="$router.go(-1)">
                    <span class="icon-back cm-header-icon fl"></span>
                </span>
                <div class="searchline">歌单广场</div>
                <div class="header-user">
                    <!-- <img src="./images/home-defaultavat.jpg" /> -->
                </div>
            </div>
            <div class="community-wrap">
                <div class="waterfall_wrap">
                    <div class="water-title">
                        <ul class="water-tab" @click="scrollTabFun($event)">
                            <li class="item">
                                <span class="active">推荐</span>
                            </li>
                            <li class="item"><span>精品</span></li>
                            <li class="item"><span>🔥华语</span></li>
                            <li class="item"><span>流行</span></li>
                            <li class="item"><span>摇滚</span></li>
                            <li class="item"><span>轻音乐</span></li>
                            <li class="item"><span>说唱</span></li>
                            <li class="item"><span>古典</span></li>
                            <li class="item"><span>古风</span></li>
                            <li class="item"><span>民族</span></li>
                        </ul>
                    </div>
                    <div class="waterfall_content">
                        <ul class="clearfix">
                            <li class="fall">a</li>
                            <li class="fall">b</li>
                            <li class="fall">c</li>
                            <li class="fall">c</li>

                            <li class="fall">c</li>
                            <li class="fall">d</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // scrollTab:null,
            // scrollTabspan:null,
        };
    },
    methods: {
        // scrollTab.offsetLeft = "-600px";
        scrollTabFun(e) {
            let scrollTab =
                this.$refs.tabbox.getElementsByClassName("water-tab")[0];
            let scrollTabspan =
                this.$refs.tabbox.querySelectorAll(".water-tab span");
            // console.log(this.scrollTab, this.scrollTabspan);
            // console.log(scrollTab.scrollLeft);
            // scrollTab.scrollTo(300,0)
            if (e.target.nodeName == "SPAN") {
                [...scrollTabspan].forEach((item, index) => {
                    console.log(index);
                    item.classList.remove("active");
                });
                e.target.classList.add("active");
                // console.log(e.target.scrollLeft);

                //设置选中条目居中scrollLeft=(单前元素左偏移量 - 元素宽度/2)- 屏幕宽度/2
                // 1、获取目标元素宽度
                let m_width = e.target.offsetWidth;
                // console.log(m_width);
                // 2、获取当前元素左偏移量
                let m_offsetLeft = e.target.offsetLeft;
                // console.log(m_offsetLeft);
                // 3、获取单前屏幕宽度
                let win_width = document.body.offsetWidth;
                // console.log(win_width);
                let m_scrollLeft = m_offsetLeft + m_width / 2 - win_width / 2;
                // 设置元素单前的滚动距离
                // scrollTab.style.transition = "all 2s"
                scrollTab.scrollLeft = m_scrollLeft;
            }
        },
        aa() {},
    },
    mounted() {
        this.$nextTick(() => {});
    },
};
</script>
<style lang="less">
.square {
    .box {
        max-width: 750px;
        margin: 0 auto;
    }
    .icon-back {
        display: block;
        width: 44px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        position: relative;
    }

    .icon-back::before {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border: 2px solid #333;
        border-top: none;
        border-right: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        transform: rotate(45deg);
    }

    .header {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        height: 44px;
        text-align: center;
        line-height: 44px;
        display: flex;
        align-items: center;
        background-color: #fff;
        z-index: 10;
    }

    .header .localtion {
        height: 44px;
        width: 66px;
    }

    .header .localtion > span {
        line-height: 44px;
    }

    .ico-arrow {
        display: inline-block;
        width: 16px;
        height: 14px;
        margin-left: 5px;
        // background: url(./images/下拉-边框.png) no-repeat 0 0 / cover;
    }

    .header .searchline {
        flex: 1;
        height: 32px;
        border-radius: 32px;
        font-size: 14px;
        line-height: 32px;
        padding: 0 6px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #000;
    }

    .header .header-user {
        width: 28px;
        height: 28px;
        margin-left: 11px;
        overflow: hidden;
        padding: 0 6px;
        /* box-sizing: border-box; */
    }

    .header .header-user > img {
        width: 100%;
        border-radius: 50%;
    }

    .community-wrap {
        padding-top: 44px;
    }

    .community-wrap .water-title {
        height: 60px;
        /* background-color: orange; */
        overflow: hidden;
    }

    .community-wrap .water-title .water-tab {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow-x: scroll;
        overflow-y: hidden;

        /* 去掉滚动条 */
        scrollbar-width: none;
        /* firefox */
        -ms-overflow-style: none;
        /* IE 10+ */

        scroll-behavior: smooth;
    }

    .community-wrap .water-title .water-tab::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
    }

    .community-wrap .water-title .water-tab .item {
        flex-shrink: 0;
        font-size: 16px;
        min-width: 70px;
        text-align: center;
        margin: 0 12px;
        font-size: 16px;
        color: #222;
    }

    .active {
        padding-bottom: 2px;
        /* background: #2fcfbb; */
        border-bottom: 3px solid #2fcfbb;
        font-size: 21px;
    }
    .waterfall_content {
        background-color: #f4f8fb;
        padding-left: 12px;
        box-sizing: border-box;
    }
}
</style>