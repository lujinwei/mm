<template>
    <div class="scroll">
        <!-- <div class="header">header</div> -->
        <div class="content" :style="{ top: top, bottom: bottom }">
            <div class="left" v-show="false">
                <!-- 必须获取ul滚动区域，上一个父元素对象 ref="left" -->
                <ul>
                    <!-- class="current" -->
                    <li
                        :class="{ current: currentIndex == index }"
                        v-for="(item, index) in left"
                        :key="index"
                        @click="selectItem(index, $event)"
                    >
                        <span class="left-item">{{ item }}</span>
                    </li>
                </ul>
            </div>
            <div class="right" ref="right">
                <ul>
                    <!-- <li
                        v-for="(item, index) in right"
                        :key="index"
                        class="right_item"
                    >
                        <h2>{{ item.name }}</h2>
                        <div class="lists">
                            <div
                                class="singer"
                                v-for="(k, i) in item.data"
                                :key="i"
                            >
                                <div class="img-box">
                                    <img :src="k.img1v1Url" alt="" />
                                </div>
                                <div class="singer-name">{{ k.name }}</div>
                            </div>
                        </div>
                    </li> -->
                    <li
                        v-for="(item, index) in right"
                        :key="index"
                        class="right_item"
                    >
                        <h2>{{ item.name }}</h2>
                        <div class="lists">
                            <div
                                class="singer"
                                v-for="(k, i) in item.data"
                                :key="i"
                            >
                                <router-link  tag="div" :to="'/toplist/singermusic?id='+k.id+'&type=1'" class="img-box">
                                    <img :src="k.img1v1Url" alt="" />
                                </router-link>
                                <div class="singer-name">{{ k.name }}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div ref="left" class="dots">
                <ul>
                    <li
                        v-for="(item, index) in left"
                        :key="index"
                        :class="{ current: currentIndex == index }"
                        @click="selectItem(index, $event)"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// 按需加载
import BScroll from "@better-scroll/core";

export default {
    data() {
        return {
            listsHeight: [], //存储高度
            // currentIndex:0,
            scrollY: "", //右侧滚动条高度  实时数据
        };
    },
    //   props:["left","right","top","bottom"],
    props: {
        left: {
            default: function () {
                return ["按钮1", "按钮2", "按钮3"];
            },
        },
        right: {
            default: function () {
                return [
                    {
                        name: "内容1",
                        content: [1, 2, 3, 4, 5, 6],
                    },
                    {
                        name: "内容2",
                        content: [1, 2, 3, 4, 5, 6],
                    },
                    {
                        name: "内容3",
                        content: [1, 2, 3, 4, 5, 6],
                    },
                ];
            },
        },
        top: {
            default: "50px",
        },
        bottom: {
            default: "0px",
        },
    },
    methods: {
        // 滚动效果初始化方法
        _initScroll() {
            // 左侧滚动效果初始化
            this.lefts = new BScroll(this.$refs.left, {
                click: true, //点击触发
                probeType: 3, //深针的效果，时时获取滚动高度
            });

            // 右侧滚动效果初始化
            this.rights = new BScroll(this.$refs.right, {
                probeType: 3, //深针的效果，时时获取滚动高度
                click:true,
            });

            // 获取滚动高度
            this.rights.on("scroll", (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y)); //当前滚动条高度
                
            });
        },
        // 获取右侧每一个li高度
        _getHegiht() {
            let rightItems =
                this.$refs.right.getElementsByClassName("right_item");
            let height = 0;
            this.listsHeight.push(height);
            for (let i = 0; i < rightItems.length; i++) {
                let item = rightItems[i];
                height += item.clientHeight; //获取高
                this.listsHeight.push(height);
            }
            // console.log(this.listsHeight);
        },
        // 左侧点击效果
        selectItem(index, event) {
            if (!event._constructed) {
                //如果不存在这个属性,则为原生点击事件，不执行下面的函数
                return;
            } else {
                // 获取右侧所有对象
                let rightItems =
                    this.$refs.right.getElementsByClassName("right_item");
                let el = rightItems[index]; //左侧点击位置，对应右侧滚动对象
                // 插件内置方法scrollToElement(对象,滚动速度)
                this.rights.scrollToElement(el, 300);
            }
            // this.currentIndex = index;
        },
    },
    // 页面挂载后生命周期函数
    // 引入第三方js库
    // vue页面加载慢，第三方js库提前加载问题?
    // vm.$nextTick() 方法 保证vue执行完，页面挂载数据后，再执行第三方库
    mounted() {
        this.$nextTick(() => {
            this._initScroll();
            this._getHegiht();
        });
    },
    // 计算属性
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listsHeight.length; i++) {
                let height = this.listsHeight[i];
                let height2 = this.listsHeight[i+1];

                if (
                    !height2 ||
                    (this.scrollY >= height && this.scrollY < height2)
                ) {
                    // 控制左侧li位置
                    let leftItems = this.$refs.left.getElementsByTagName("li");
                    this.lefts.scrollToElement(leftItems[i], 200);
                    return i;
                }
            }

            return 0;
        },
    },
};
</script>

<style lang="less" scoped>
ul {
    list-style: none;
}
.header {
    height: 50px;
    line-height: 50px;
    background-color: #f47378;
}
.content {
    max-width: 750px;
    min-width: 320px;
    background-color: #f2f3f4;
    width: 100%;
    position: absolute;
    top: 50px;
    bottom: 0px;
    display: flex;
    overflow: hidden;
}
.content .left {
    flex: 0 0 80px;
    background-color: #98e0ad;
}
.content .left li {
    width: 100%;
    text-align: center;
}
.content .left li.current span {
    color: #007aae;
    font-weight: bold;
    font-size: 16px;
    background-color: #c8efd4;
}
.content .left li span {
    display: block;
    height: 100px;
    line-height: 100px;
    font-size: 14px;
}
.content .right {
    flex: 1;
}
.content .right h2 {
    height: 18px;
    line-height: 18px;
    font-size: 10px;
    color: #fff;
    background-color: #dadbdc;
    width: 100%;
    text-indent: 8px;
}
.content .right .lists {
    margin: 0 4px;
}
.content .right .lists .singer {
    background-color: #f2f3f4;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    height: 47px;
    .img-box {
        width: 46px;
        height: 46px;
        border-radius: 2px;
        img {
            width: 46px;
            height: 46px;
            padding: 2px;
            box-sizing: border-box;
        }
    }
    .singer-name {
        flex: 1;
        margin-left: 13px;
        font-size: 12px;
    }
}
.dots {
    position: absolute;
    z-index: 999;
    top: 82px;
    right: 3px;
    font-size: 12px;
    color: #58585a;
    li {
        margin-bottom: 4px;
        &.current {
            color: red;
        }
    }
}
</style>