import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
import createPersistedState from "vuex-persistedstate"
export default new Vuex.Store({
  state: {
    userInfo:{
      username:'',
      motto:'',
      thumbnail:'',
      tokenid:'',
    }
  },
  mutations: {
    updateUserInfo(state, payload){
      state.username = payload.username || state.username;
      state.motto = payload.motto || state.motto;
      state.thumbnail = payload.thumbnail || state.thumbnail;
      state.tokenid = payload.tokenid || state.tokenid;
    }
  },
  actions: {
    
  },
  getters:{
    getUserInfo:state => {
      return state.userInfo;
    },
    judgeLogin:state=>{
      return state.userInfo.tokenid ? {status:false} : {status:true,...state.userInfo};
    }
  },
  plugins: [createPersistedState()]
})

