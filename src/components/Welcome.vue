<template>
<div id="welcome">
   <img class="welcomepage" src="../assets/webp.jpg" alt="">
   <mt-badge type="success">{{time}}</mt-badge>
   
</div>
</template>
<script>
    import {Badge} from 'mint-ui'
export default {
    name:'welcome',
    data(){
        return{
            time:5
        }
    },created(){
        let i = setInterval(()=>{
            this.time--;
            if(this.time <= 0){
                clearInterval(i);
                this.$router.push("/index");
            }
        },1000)
    }

}    
</script>
<style scoped>
html,body{
    padding: 0;
    margin: 0;
}
.welcomepage{
    width: 100vw;
    height: 95vh;
}

</style>
