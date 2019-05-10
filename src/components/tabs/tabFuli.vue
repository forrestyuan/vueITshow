<template>
  <div>
    <mt-header fixed title="ITshow 福利"></mt-header>
    <ul class="imgListBox" v-show="!isshowbigimg"  v-infinite-scroll="loadMoreFuli"  infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li class="fuliimgwrap" v-for="(item,key) in imglist" :key="key">
          <img @click="tobigimg"  v-lazy.container="item.url">
          <div :style="{fontSize:12+'px',color:'#222'}">{{(item.createdAt).substring(0,10)}}</div>
        </li>
    </ul>
    <div class="bigimgwrap" v-show="isshowbigimg">
        <div id="close" @click="exitbigimg">X</div>
        <img :style="{width:100+'vw'}" :src="bigsrc" alt="img">
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import axios from "axios";

export default {
  name: "tabfuli",
  props: ["fuliactive"],
  data() {
    return {
      imgpage: 1, //fuli
      loading: false, //fuli
      isshowbigimg: false, // fuli
      bigsrc: "", //fuli
      pagey: 0, //fuli
      imglist: [] //fuli
    };
  },
  //vue 钩子函数
  updated() {
    Indicator.close();
  },
  methods: {
    //mintui 的滚动加载
    loadMoreFuli() {
      if (!this.isshowbigimg) {
        if (
          window.scrollY + window.outerHeight >=
          document.body.offsetHeight - 20
        ) {
          this.showIndicator();
          this.getFuliImg(this.imgpage++);
        }
      }
    },
    //请求福利img
    getFuliImg(page) {
      this.loading = true;
      axios
        .get("http://gank.io/api/data/福利/10/" + page)
        .then(response => {
          let data = response.data.results;
          for (let i = 0; i < data.length; i++) {
            if (data[i] !== null && data[i] != undefined) {
              this.imglist.push(data[i]);
            }
          }
          this.loading = false;
          Indicator.close();
        })
        .catch(error => {
          this.loading = false;
          Indicator.close();
          this.toast();
        });
    },
    //加载进度条
    showIndicator() {
      this.loading = true;
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
    },
    //查看大图
    tobigimg(event) {
      this.pagey = window.scrollY;
      this.isshowbigimg = true;
      this.bigsrc = event.target.src;
    },
    //退出大图模式
    exitbigimg() {
      this.isshowbigimg = false;
      setTimeout(() => {
        window.scrollTo(0, this.pagey);
      }, 0);
    },
    //toast 封装
    toast(message = "请求错误") {
      Toast({ message, position: "middle", duration: 2000 });
    }
  },
  //vue 钩子函数
  created() {
    this.getFuliImg(this.imgpage++);
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
html,
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.imgListBox {
  text-align: center;
  padding: 40px 0% 40px 2%;  
  list-style: none;
  overflow: hidden;
}

.fuliimgwrap {
  position: relative;
  width: 45%;
  -webkit-box-shadow: 1px 1px 2px 1px#ccc;
  box-shadow: 1px 1px 2px 1px#ccc;
  padding: 0px;
  box-sizing: border-box;
  margin: 5px;
  float: left;
  height: 230px;
  overflow: hidden;
}
.fuliimgwrap img {
  display: inline-block;
  height: 92%;
}
.bigimgwrap{
  padding-top: 45px;
}
#close {
  position: absolute;
  top: 8vh;
  right: 2vw;
  width: 30px;
  height: 30px;
  font-weight: bold;
  padding-top: 0.2em;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
