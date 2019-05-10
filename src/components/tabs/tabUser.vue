<template>
  <div id="container">
    <mt-header @dblclick="gotop()" fixed title="用户中心"></mt-header>
    <!-- <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <mt-field label="网站" placeholder="请输入网址" type="url" v-model="website"></mt-field>
        <mt-field label="数字" placeholder="请输入数字" type="number" v-model="number"></mt-field>
        <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
        <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-modal="introduction"></mt-field> -->
  </div>
</template>

<script>
import {Header,Field} from 'mint-ui';
import axios from 'axios';
import {mixin} from '../../util/index.js'

export default {
  name: 'tabuser',
  data(){
    return{

    }
  },
  //vue 钩子函数
  updated(){},
  methods: {},
  //vue 钩子函数
  created () {
    this.gotop();
  },
  mixins:[mixin]
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
</style>
