<template>
    <div class="guidepage">
        <!-- Swiper -->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="../../assets/img/guide1.png" />
                </div>
                <div class="swiper-slide">
                    <img src="../../assets/img/guide2.png" />
                </div>
                <div class="swiper-slide">
                    <van-button type="primary" to="/" size="mini"
                        >进入首页</van-button
                    >
                    <img src="../../assets/img/guide3.png" />
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import Swiper from "swiper";
export default {
    mounted() {
        new Swiper(".swiper-container", {
            pagination: {
                el: ".swiper-pagination",
            },
        });
    },
};
</script>
<style lang="less">
.van-button{
    position: absolute !important;;
    bottom: 50px;
    left: 50%;
    right: 0;
    transform: translateX(-50%);
}
.van-button--primary{
    width: 80px;
    padding: 7px;
    background-color: #fa7366 !important;
    border: none !important;
}
.guidepage {
    width: 100%;
    height: 100%;
    position: fixed;
    img {
        width: 100%;
        // height: 100%;
    }
}
.swiper-container {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
</style>