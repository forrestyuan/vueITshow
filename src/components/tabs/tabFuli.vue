<template>
  <div id="container">
    <mt-header :fixed="scrolled" title="ITshow 福利"></mt-header>
    <ul v-show="!isshowbigimg"  v-infinite-scroll="loadMoreFuli"  infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li class="fuliimgwrap" v-for="item in imglist">
            <img @click="tobigimg"  v-lazy.container="item.url">
        <div :style="{fontSize:12+'px',color:'#222'}">{{(item.createdAt).substring(0,10)}}</div>
        </li>
    </ul>
    <div v-show="isshowbigimg">
        <img :style="{width:100+'vw'}" :src="bigsrc" alt="img">
        <span id="close" @click="exitbigimg">X</span>
    </div>
  </div>
</template>

<script>
import {Header, Toast, InfiniteScroll, TabItem,Lazyload, Indicator } from 'mint-ui';
import axios from 'axios';

export default {
  name: 'tabfuli',
  props:['fuliactive'],
  data(){
    return{
      imgpage:1, //fuli
      loading:false, //fuli
      scrolled: false,  //all
      isshowbigimg:false, // fuli
      bigsrc:"",  //fuli
      pagey:0,  //fuli
      imglist:[], //fuli
    }
  },
  //vue 钩子函数
  updated(){
    Indicator.close();
  },
  methods: {
    handleScrollFuli () {
      //头部固定
      this.scrolled = window.scrollY >= 20;
    },
    //mintui 的滚动加载
    loadMoreFuli() {
      if(this.fuliactive =="fuli" && !this.isshowbigimg){
        if(window.scrollY + window.outerHeight >= document.body.offsetHeight -20){
          this.showIndicator();
          this.getFuliImg(this.imgpage ++);
        }
      }
    },
    //请求福利img
    getFuliImg(page){
      this.loading=true;
      axios.get('http://gank.io/api/data/福利/10/'+page)
        .then(response=>{
          let data = response.data.results;
          for (let i = 0; i < data.length; i++) {
            if(data[i]!==null && data[i]!=undefined){
              this.imglist.push(data[i]);
            }
          }
          this.loading = false; 
          Indicator.close();
        })
        .catch(error=>{
           this.loading = false; 
           Indicator.close();
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
    //查看大图
    tobigimg(event){
      this.pagey = window.scrollY;
      this.isshowbigimg = true;
      this.bigsrc=event.target.src;
    },
    //退出大图模式
    exitbigimg(){
      this.isshowbigimg = false;
      // alert(this.pagey);
      setTimeout(()=>{
        window.scrollTo(0,this.pagey)
      },0)
    },
    //toast 封装
    toast(message="请求错误"){
      Toast({ message,position: 'middle',duration: 2000 });
    }
  },
  //vue 钩子函数
  created () {
    window.addEventListener('scroll', this.handleScrollFuli);
    this.getFuliImg(this.imgpage++);
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
ul{
  text-align: center;
  padding: 0;
  list-style: none;
}
ul li{
   display: inline-block;
  width: 90%;
  height: auto;
  margin: 0 auto;
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
.fuliimgwrap{
  position: relative;
  width: 40vw;
  box-shadow:1px 1px  2px 1px#ccc;
  margin: 3px;
}
#close{
  position: absolute;
  top:8vh;
  right: 2vw;
  width:30px;
  height: 30px;
  font-weight: bold;
  padding-top: 0.2em;
  font-size: 20px;
  background-color: rgba(0,0,0,0.5);
  color: white;
}
</style>
