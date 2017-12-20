<template>
<div>
  <mt-header title="走丢了....">
    <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
    </router-link>
   </mt-header>
   <h1>{{hello}}</h1>
</div>
</template>
<script>
import {Header,Indicator } from 'mint-ui';
export default {
    name:'notFound',
    data(){
        return {
            hello:'此页面不存在 404'
        }
    }
}    
</script>
<style scoped>
html,body{
    padding: 0;
    margin: 0;

}
</style>
