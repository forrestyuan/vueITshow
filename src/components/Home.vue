<template>
  <div id="container">
    <router-view></router-view>
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item  v-for="(item, key) in tabbarList" :id="item.id" :key="key"> 
        <img slot="icon" :src="item.imgUrl">{{item.tabName}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>


<script>

export default {
  name: "home",
  data() {
    return {
      selected: 0, //navtab
      tabbarList: [
        {
          id: 0,
          imgUrl: require("../assets/home.png"),
          to: "home",
          tabName: "首页"
        },
        {
          id: 1,
          imgUrl: require("../assets/fuli.png"),
          to: "fuli",
          tabName: "福利"
        },
        {
          id: 2,
          imgUrl: require("../assets/search.png"),
          to: "search",
          tabName: "搜搜"
        },
        {
          id: 3,
          imgUrl: require("../assets/go.png"),
          to: "moive",
          tabName: "影讯"
        },
        {
          id: 4,
          imgUrl: require("../assets/my.png"),
          to: "user",
          tabName: "我的"
        }
      ],
    };
  },
  //vue 钩子函数
  updated() {
    this.$router.push(this.tabbarList[this.selected].to);
  }
};
</script>

<style>
html,
body {
  /* overflow: hidden; */
  margin: 0;
  padding: 0;
}
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
#container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0 0 55px 0;
  height: 100%;
  box-sizing: border-box;
}
</style>
