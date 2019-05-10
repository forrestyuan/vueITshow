export default{
  methods:{
    //返回顶部
    gotop:function(){
      setTimeout(function(){ 
        console.log('to top')
        window.scrollTo(0,0)
      },0);
    }
  }
}

