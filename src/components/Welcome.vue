<template>
<div id="welcome">
   <img class="welcomepage" src="../assets/webp.jpg" alt="">
   <router-link to="/index" id="btn"><mt-badge type="success">{{time}}</mt-badge></router-link>
   
</div>
</template>
<script>
    import {Badge} from 'mint-ui'
export default {
    name:'welcome',
    data(){
        return{
            time:20
        }
    },created(){
        let i = setInterval(()=>{
            this.time--;
            if(this.time <= 0){
                clearInterval(i);
                document.getElementById("btn").click();
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
