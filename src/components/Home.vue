<template>
  <div id="container">
    <mt-tab-container v-model="active" :swipeable="true">
      <!-- 首页 -->
      <mt-tab-container-item id="zhuye">
        <tabhome :homeactive="active"/>
      </mt-tab-container-item>
      <!-- 福利 -->
      <mt-tab-container-item id="fuli">
        <tabfuli :fuliactive="active"/>
      </mt-tab-container-item>
      <!-- 搜索页 -->
      <mt-tab-container-item id="find">
        <tabsearch></tabsearch>
      </mt-tab-container-item>
      <!-- 影讯 -->
       <mt-tab-container-item id="moive">
         <tabmoive :moiveactive="active"/>
      </mt-tab-container-item>
      <!-- 个人主页 -->
      <mt-tab-container-item id="my">
       <tabuser/>
      </mt-tab-container-item>
       <span @click="gotop" id="gotoTop"><img src="../assets/totop.png"></span>
    </mt-tab-container>
    <!-- 导航条 -->
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item id="zhuye"> 
        <img slot="icon" src="../assets/home.png">首页
      </mt-tab-item>
      <mt-tab-item id="fuli">
        <img slot="icon" src="../assets/fuli.png">福利
      </mt-tab-item>
      <mt-tab-item id="find">
        <img slot="icon" src="../assets/search.png">搜搜
      </mt-tab-item>
      <mt-tab-item id="moive">
        <img slot="icon" src="../assets/go.png">影讯
      </mt-tab-item>
      <mt-tab-item id="my">
        <img slot="icon" src="../assets/my.png">我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import {Search ,Header,Swipe, SwipeItem, Toast, TabContainer, TabContainerItem, InfiniteScroll, Tabbar, TabItem,Lazyload, Indicator } from 'mint-ui';
import axios from 'axios';
import tabhome from '../components/tabs/tabHome';
import tabfuli from '../components/tabs/tabFuli';
import tabsearch from '../components/tabs/tabSearch';
import tabmoive from '../components/tabs/tabMoive';
import tabUser from '../components/tabs/tabUser';
export default {
  name: 'home',
  components:{
    'tabhome':tabhome,
    'tabfuli':tabfuli,
    'tabsearch':tabsearch,
    'tabmoive':tabmoive,
    'tabuser':tabUser
  },
  data(){
    return{
      selected:'zhuye', //navtab
      active:'zhuye',  //navtab
      scrolled: false,  //all
    }
  },
  //vue 钩子函数
  updated(){
    this.active = this.selected;
    Indicator.close();
  },
  methods: {
    handleScroll () {
      // //滚动返回顶部
      if(window.scrollY > 600){
        document.getElementById("gotoTop").style.display="inline-block";
      }else{
        document.getElementById("gotoTop").style.display="none";
      }
    },
    //返回顶部
    gotop(){
      setTimeout(()=>{
        window.scrollTo(0,0)
      },0);
    }
  },
  //vue 钩子函数
  created () {
    window.addEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
html,body{
  overflow: hidden;
  margin:0;
  padding: 0;
}
#container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  padding: 0;
  height: 100%;
}
#gotoTop{
  display: none;
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color:rgb(123, 178, 250);
}
#gotoTop img{
  width: 30px;
  height: 30px;
}

</style>
