<template>
  <div id="container">
    <mt-header :fixed="false" title="IT show 搜一搜"></mt-header>
    <mt-search v-model="value" cancel-text="取消"  placeholder="搜索关键字" @keyup.enter.native="searchData">
        <mt-cell v-for="item in result" :title="item.desc" :value="item.type" >
            <span slot="icon" :style="{float:'left'}"> 
                <a :href="item.url" target="_blank">
                    <img src="../../assets/searchlogo.png" alt="img">
                </a>
            </span>
        </mt-cell>
    </mt-search>
  </div>
</template>

<script>
import {Search ,Toast,Indicator } from 'mint-ui';
import axios from 'axios';
export default {
  name: 'tabsearch',
  data(){
    return{
      result:[], //search
      value:"", //search
    }
  },
  //vue 钩子函数
  updated(){
    Indicator.close();
  },
  methods: {
    //搜索
    searchData(){
      this.showIndicator();
      let keyword = this.value;
      axios.get('http://gank.io/api/search/query/'+keyword+'/category/all/count/40/page/1')
      .then(res=>{
        this.result=[];
        let data = res.data.results;
          for (let i = 0; i < data.length; i++) {
            if(data[i]!==null && data[i]!=undefined){
              this.result.push(data[i]);
            }
          } 
          Indicator.close();
          if(this.result.length < 1){
            this.toast("暂时没有数据");
          }
      }).catch(err=>{
        Indicator.close();
        this.toast();
      })
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
</style>
