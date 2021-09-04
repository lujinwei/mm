import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import recommendlist from "../views/recommend.vue"
import guidePage from "../components/public/guidePage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/guidepage', // 引导页
    name: 'guidepage',
    component:guidePage
  },
  {
    path: '/', // 首页
    redirect:"/recommendlist",
    meta:{
      isshow:true
    }
  },
  {
    path: '/recommendlist', // 推荐
    name: 'recommendlist',
    component:recommendlist,
    meta:{
      isshow:true
    }
  },
  {
    path: '/toplist', // 排行榜
    name: 'toplist', 
    component:()=>import("../views/toplist.vue"),
    meta:{
      isshow:true
    }
  },
  {
    path: '/playlist', // 歌手排行
    name: 'playlist',
    component:()=>import("../views/playlist.vue"),
    meta:{
      isshow:true
    }
  },
  {
    path: '/mvlist', // mv列表
    name: 'mvlist',
    component:()=>import("../views/mvlist.vue"),
    meta:{
      isshow:true
    }
  },
  {
    path: '/toplist/ranklist', // 歌曲榜单列表
    name: 'ranklist',
    component:()=>import("../components/toplist/ranklist.vue"),
  },
  {
    path: '/toplist/singermusic', // 歌手歌曲列表
    name: 'singermusic',
    // component:()=>import("../components/playlist/singermusic.vue"),
    component:()=>import("../components/toplist/ranklist.vue"),

  },
  {
    path: '/albumlist/album', // 歌手歌曲列表
    name: 'album',
    component:()=>import("../components/albumlist/album.vue"),

  },
  {
    path: '/mvlist/mv', // 歌手歌曲列表
    name: 'mv',
    component:()=>import("../components/mvlist/mv.vue"),

  },
  {
    path: '/search', // 歌手歌曲列表
    name: 'search',
    component:()=>import("../components/search/search.vue"),

  },
  {
    path: '/swiper', // 歌手歌曲列表
    name: 'swiper',
    component:()=>import("../components/base/mySwiper.vue"),

  },
  {
    path: '/login', // 登录
    name: 'login',
    component:()=>import("../components/base/login.vue"),
    meta:{
      isshowMini:true
    }

  },
  {
    path: '/userIndex', //
    name: 'userIndex',
    component:()=>import("../components/base/userIndex.vue"),
    // 路由守卫
    beforeEnter: (to, from, next) => {
      // ...
      let login = window.localStorage.getItem("login");
      if(!login){ // 判断登录状态
        next("/login");
        return ;
      }else{
        next();
      }
    }
  },
  {
    path: '/square', // 歌手歌曲列表
    name: 'square',
    // component:()=>import("../components/search/search.vue"),
    component:()=>import("../components/square/square.vue"),

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
