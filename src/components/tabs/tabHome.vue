<template>
  <div id="container">
      <!-- 首页 -->
    <mt-header :fixed="scrolled" title="IT show"></mt-header>
        <mt-swipe :show-indicators="false" :stopPropagation="true" :style="{height:150+'px'}">
          <mt-swipe-item><img :style="{height:150+'px'}" src="../../assets/lunbo1.png" alt="img"></mt-swipe-item>
          <mt-swipe-item><img :style="{height:150+'px'}" src="../../assets/lunbo4.png" alt="img"></mt-swipe-item>
          <mt-swipe-item><img :style="{height:150+'px'}" src="../../assets/lunbo5.png" alt="img"></mt-swipe-item>
        </mt-swipe>
         <mt-cell value="精品干货(每日更新)" :style="{textAlign:'left',fontSize:12+'px'}"><img slot="icon" src="../../assets/jishi.png" height="30"></mt-cell>
        <ul v-infinite-scroll="loadhome" infinite-scroll-disabled="loadingH" infinite-scroll-distance="15">
          <li v-for="item in homelist"> 
            <a :href="item.url" target="_blank">
            <div class="homelistItem">
              <div class="hiDesc">{{item.desc}}</div>
              <div v-if="item.images != undefined"><img :src="item.images[0]" alt="img"></div>
              <div class="hiInfoWrap">
                <span>{{item.type}}</span>&nbsp;&nbsp;
                <span>{{item.who}}</span>&nbsp;&nbsp;
                <span>{{(item.createdAt).substring(0,10)}}</span>
              </div>
            </div>
          </a>
          </li>
        </ul>
  </div>
</template>

<script>
import {Header, Swipe, SwipeItem,Toast, InfiniteScroll, Indicator } from 'mint-ui';
import axios from 'axios';

export default {
  name: 'tabhome',
  props:['homeactive'],
 data(){
    return{
      scrolled: false,
      homepage:1, //zhuye
      loadingH:false, //home
      homelist:[], //zhuye
    }
  },
  methods: {
    handleScrollHome () {
      //头部固定
      this.scrolled = window.scrollY >= 20; 
    },
    //mintui 的滚动加载
    loadhome() {
      if(this.homeactive == 'zhuye'){
        this.showIndicator();
        this.getHomeList(this.homepage ++)
      }
    },
    //首页列表
    getHomeList(page){
      this.loadingH=true;
      axios.get('http://gank.io/api/data/all/10/'+page)
        .then(response=>{
          let data = response.data.results;
          for (let i = 0; i < data.length; i++) {
            if(data[i]!==null && data[i]!=undefined){
              this.homelist.push(data[i]);
            }
          }
          this.loadingH = false; 
          Indicator.close();
        })
        .catch(error=>{
          Indicator.close();
           this.loadingH = false; 
            this.toast();
        });
    },
    //加载进度条
    showIndicator(){
      this.loading = true;
        Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
    },
    //toast 封装
    toast(message="请求错误"){
      Toast({ message,position: 'middle',duration: 2000 });
    }
  },
  //vue 钩子函数
  created () {
    window.addEventListener('scroll', this.handleScrollHome);
    this.getHomeList(this.homepage ++);
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
ul{
  text-align: center;
  list-style: none;
  background-color: #eee;
  padding: 10px 0;
}
ul li{
  display: inline-block;
  width: 96%;
  height: auto;
  margin: 5px auto;
  background-color: white;
  border-radius: 5px;
  border-bottom: #ccc solid 1px;
}

ul li img{
  display: inline-block;
  width: 100%;
}
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

.homelistItem{
  margin: 5px;
}
.homelistItem img{
  max-height:300px;
  margin: 5px 0;
}
.hiDesc{
  color: #333;
  text-align: left;
  font-size: 14px;
  line-height: 1.5em
}
.hiInfoWrap{
  background-color: white;
  color: #888;
  font-size: 12px;
  text-align: left;
  margin: 10px 0;
  }
</style>
