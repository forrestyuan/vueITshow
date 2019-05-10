<template>
  <div>
      <!-- 首页 -->
        <mt-header fixed  title="IT show"></mt-header>
        <mt-swipe :show-indicators="false" :stopPropagation="true" :style="{height:150+'px',marginTop:'40px'}">
          <mt-swipe-item><img :style="{height:150+'px'}" src="../../assets/lunbo1.png" alt="img"></mt-swipe-item>
          <mt-swipe-item><img :style="{height:150+'px'}" src="../../assets/lunbo4.png" alt="img"></mt-swipe-item>
          <mt-swipe-item><img :style="{height:150+'px'}" src="../../assets/lunbo5.png" alt="img"></mt-swipe-item>
        </mt-swipe>
         <mt-cell value="精品干货(每日更新)" :style="{textAlign:'left',fontSize:12+'px'}"><img slot="icon" src="../../assets/jishi.png" height="30"></mt-cell>
        <mt-navbar v-model="topTabSelected">
          <mt-tab-item id="0">选项一</mt-tab-item>
          <mt-tab-item id="1">选项二</mt-tab-item>
          <mt-tab-item id="2">选项三</mt-tab-item>
        </mt-navbar>
        <ul v-infinite-scroll="getHomeList" infinite-scroll-disabled="loadingH" infinite-scroll-distance="20">
          <li v-for="(item,key) in homelist" :key="key"> 
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
import{mixin} from '../../util/index.js'

export default {
  name: 'tabhome',
  props:['homeactive'],
 data(){
    return{
      homepage:1, //zhuye
      loadingH:false, //home
      homelist:[], //zhuye

      topTabSelected:"0",
      groupList:[],
      subList:[]

    }
  },
  methods: {
    //首页列表
    getHomeList(){
      this.homepage ++
      this.showIndicator();
      axios.get('http://gank.io/api/data/all/5/'+this.homepage)
        .then(response=>{
          let data = response.data.results;
          for (let i = 0; i < data.length; i++) {
            if(data[i]!==null && data[i]!=undefined){
              this.homelist.push(data[i]);
            }
          }
         this.closeIndicator();
        })
        .catch(error=>{
         this.closeIndicator(); 
         this.toast();
        });
    },
    //加载进度条
    showIndicator(){
        Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
    },
    closeIndicator(){
      Indicator.close();
    },
    //toast 封装
    toast(message="请求错误"){
      Toast({ message,position: 'middle',duration: 2000 });
    }
  },
  //vue 钩子函数
  created () {
    this.getHomeList();
  },
  mixins:[mixin]
}
</script>

<style scoped>
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
