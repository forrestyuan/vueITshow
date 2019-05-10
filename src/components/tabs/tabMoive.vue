<template>
  <div id="containerM">
    <mt-header :fixed="false" title="IT show 休闲一刻">
      <mt-button slot="right" @click="handleSearch">搜影片</mt-button>
    </mt-header>
    <mt-navbar fixed v-model="navselectd">
      <mt-tab-item id="1">热门影片</mt-tab-item>
      <mt-tab-item id="2">电影院</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="navselectd">
      <mt-tab-container-item id="1">
       <ul class="movielist" >
          <li class="item" v-for="(item,key) in moivelist" :key="key">
            <a :href="'/movie/'+item.id+'?_v_=yes'" data-bid="b_MWTWF" data-lab="{ index:1, movie_id:item.id, module_name:'cell' }">
              <div class="movie-cover">
                  <img id="img" class="lazy" data-src="item.img" :src="item.img">
              </div>
              <div class="movie-content ">
                <div class="flexRow flex-item flex-middle text-ellipsis">
                  <span class="movie-name">{{item.nm}}</span>
                    <span class="movie-version version imax" :class="item['3d']?v3d:v2d"></span>
                  <div class="movie-rating" >
                    <span class="score">{{item.sc}}</span>
                  </div>
                </div>
               <p>{{item.cat}}</p>
               <p>主演:{{item.star}}</p>
              <p class="movie-show">{{item.showInfo}}</p>
              </div>
            </a>
          </li>
          </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4" :title="'测试 ' + n" :key="n"/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import {Header,Toast, InfiniteScroll,Indicator ,Navbar, TabItem } from 'mint-ui';
import axios from 'axios';
export default {
  name: 'tabmoive',
  props:['moiveactive'],
  data(){
    return{
      navselectd:'1',
      v2d:'v2d',
      v3d:'v3d',
      moivepage:0,
      moivelist:[{"showInfo":"今天225家影院放映2816场","late":false,"sn":0,"cnms":0,"scm":"少年文工团，青春很茫然","imax":true,"snum":148302,"img":"http://p0.meituan.net/165.220/movie/fe0d4da87d70ba2b91e10ac98e0bf5ef1365131.png","src":"","showDate":"","pn":447,"preSale":0,"vd":"","dir":"冯小刚","star":"黄轩,苗苗,钟楚曦","cat":"剧情,爱情,战争","wish":163381,"3d":false,"nm":"芳华","sc":9.1,"ver":"2D/IMAX 2D/中国巨幕","rt":"2017-12-15上映","dur":136,"time":"","id":1170264},{"showInfo":"今天223家影院放映1981场","late":false,"sn":0,"cnms":0,"scm":"天地有妖气，逗逼救地球","imax":true,"snum":152881,"img":"http://p1.meituan.net/165.220/movie/1f3d6ea8ba5d3bf89067bfe645bbc83f1040002.jpg","src":"","showDate":"","pn":193,"preSale":0,"vd":"","dir":"袁和平","star":"大鹏,倪妮,李治廷","cat":"喜剧,动作,奇幻","wish":167499,"3d":true,"nm":"奇门遁甲","sc":7.6,"ver":"2D/3D/IMAX 3D/中国巨幕","rt":"2017-12-14上映","dur":113,"time":"","id":344183},{"showInfo":"2017-12-22 本周五上映","late":false,"sn":0,"cnms":0,"scm":"血液藏隐秘，大哥战悉尼","imax":true,"snum":2882,"img":"http://p1.meituan.net/165.220/movie/1efd488d573bf2ec7d296940ad4911d7987434.jpg","src":"","showDate":"","pn":118,"preSale":1,"vd":"","dir":"张立嘉","star":"成龙,罗志祥,欧阳娜娜","cat":"动作,喜剧","wish":86387,"3d":true,"nm":"机器之血","sc":0.0,"ver":"2D/3D/IMAX 3D/中国巨幕/全景声","rt":"本周五上映","dur":110,"time":"","id":655258},{"showInfo":"2017-12-22 本周五上映","late":false,"sn":0,"cnms":0,"scm":"连环凶杀案，城市陷狂欢","imax":false,"snum":15871,"img":"http://p0.meituan.net/165.220/movie/f56e16bf98ac1e5dcbe2f70f9f8ecb3b811616.jpg","src":"","showDate":"","pn":314,"preSale":1,"vd":"","dir":"徐纪周","star":"邓超,阮经天,刘诗诗","cat":"剧情,动作,犯罪","wish":305194,"3d":false,"nm":"心理罪之城市之光","sc":8.7,"ver":"2D/中国巨幕","rt":"本周五上映","dur":124,"time":"","id":1197732},{"showInfo":"今天222家影院放映1495场","late":false,"sn":0,"cnms":0,"scm":"","imax":false,"snum":452487,"img":"http://p1.meituan.net/165.220/movie/4ba0ebccc0e3115911bfecdcfbbafa1a5114683.jpg","src":"","showDate":"","pn":58,"preSale":0,"vd":"","dir":"李·昂克里奇,阿德里安.莫利纳","star":"安东尼·冈萨雷斯,本杰明·布拉特,盖尔·加西亚·贝纳尔","cat":"动画,冒险,家庭","wish":16241,"3d":true,"nm":"寻梦环游记","sc":9.6,"ver":"2D/3D","rt":"2017-11-24上映","dur":105,"time":"","id":342068}],
      theaterlist:[]
    }
  },
  //vue 钩子函数
  updated(){
    this.active = this.selected;
    Indicator.close();
  },
  methods: {
    handleScroll () {
      this.scrolled = window.scrollY >= 10; //头部固定
      // if(this.moiveactive=="moive"){
      //   if(window.scrollY + window.outerHeight >= document.body.offsetHeight -20){
      //     this.showIndicator();
      //     this.getMoive(this.moivepage ++);
      //   }
      // }
    },handleSearch(){
      alert("后期完善")
    },
    getMovie(page){
      // axios.get('http://m.maoyan.com/movie/list.json?type=hot&offset='+page+'&limit=10' )
      // .then(res=>{
      //     if((res.data.moives).length >0){
      //       this.moivelist =res.data.moives;
      //     }else{
      //       this.toast("没有数据");
      //     }
          
      // }).catch(err=>{

      // })
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
    window.addEventListener('scroll', this.handleScroll);
    // this.getMovie(this.moivepage++);
  }
}
</script>

<style scoped>
a{text-decoration: none;}
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
/*电影列表*/
.movielist .item {
    display: inline-block;
    padding: .25rem 0;
    border-bottom: 1px solid #E6E6E6;
}
.movie, .movielist .item {
    width: 100%;
    position: relative;
    box-sizing: border-box;
}
.movie-content {
    margin: .08rem 0 0 1.48rem;
    position: relative;
    text-align: left;
}
.movielist .flexRow {
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -o-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}

.movie-content p {
    white-space: nowrap;
    margin-right: 1.2rem;
}
.movie-content p, .movie-name, .text-ellipsis, body p {
    text-overflow: ellipsis;
}
body p {
    color: #666;
    display: block;
    line-height: 1.7;
    font-size: .26rem;
    margin: 0;
}
.movie-cover img#img{
    display: block;
    width: 100%;
}
.movie-cover {
   width: 3.28rem;
    height: 5rem;
    margin-right: 5px
  }
  .movie-rating span {
    margin-right: 10px
  }
</style>
