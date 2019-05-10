<template>
  <div id="search-container">
    <mt-header title="IT show 搜一搜"></mt-header>
    <mt-search v-model="value"   placeholder="搜索关键字" @keyup.enter.native="searchData">
        <mt-cell class="resCell" v-for="(item,key) in result" :title="item.desc" :value="item.type" :key="key" >
            <div v-if="item.who == 'ITshowSplit'">
              <mt-badge class="lineSplit" size="small" color="#888">以下为新结果</mt-badge>
            </div>
            <span v-else slot="icon" :style="{float:'left'}"> 
                <a :href="item.url" target="_blank">
                    <img src="../../assets/searchlogo.png" alt="img">
                </a> 
            </span>
        </mt-cell>
        <mt-button v-if="!searchDone && result.length" @click="loadMore" type="primary" size="small">查看更多</mt-button>
        <mt-button v-if="searchDone" disabled type="default" size="small">已加载所有</mt-button>
    </mt-search>
  </div>
</template>

<script>
import { Search, Toast, Indicator } from "mint-ui";
import axios from "axios";
export default {
  name: "tabsearch",
  data() {
    return {
      result: [], //search
      value: "", //search
      searchRespage: 1,
      searchDone:false,
    };
  },
  //vue 钩子函数
  updated() {
    Indicator.close();
  },
  methods: {
    loadMore() {
      this.searchData(false);
    },
    //搜索
    searchData(isNew = true) {
      isNew ? (this.searchRespage = 1) : ++this.searchRespage;
      this.showIndicator();
      let keyword = this.value;
      axios
        .get(`http://gank.io/api/search/query/${keyword}/category/all/count/10/page/${this.searchRespage}`)
        .then(res => {
          isNew ? (this.result = []) : false;
          this.searchDone = !res.data.results.length;
          let data = res.data.results;
          (!isNew && res.data.results.length!==0 )?this.result.push({who: "ITshowSplit"}):false;
          for (let i = 0; i < data.length; i++) {
            if (data[i] !== null && data[i] != undefined) {
              this.result.push(data[i]);
            }
          }
          Indicator.close();
          if (this.result.length < 1) {
            this.toast("暂时没有数据");
          }
        })
        .catch(err => {
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
    //toast 封装
    toast(message = "请求错误") {
      Toast({ message, position: "middle", duration: 2000 });
    }
  }
};
</script>

<style>
#search-container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  font-size: 14px;
  height: 100%;
}
#search-container .lineSplit{
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
#search-container * {
  font-size: 14px !important;
}
#search-container .mint-header {
  z-index: 100;
}
#search-container .mint-search {
  height: 83%;
}

#search-container .mint-search-list-warp {
  padding-top: 40px;
  padding-bottom: 55px;
  box-sizing: border-box;
}
#search-container .resCell {
  margin: 5px 0;
  border-bottom: solid 1px #efefef;
}
#search-container .resCell .mint-cell-text {
  display: block;
  margin: 0 0 0 50px;
}
#search-container .mint-searchbar {
  background-color: #fff;
  padding: 3px 5px !important;
  border-bottom: solid 1px #efefef !important;
}
</style>
