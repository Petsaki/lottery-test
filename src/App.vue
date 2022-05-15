<template>
  <div class="min-h-screen bg-[#f5f5f6]">
    <app-header  v-if="this.$store.getters.IS_LOGGEDIN"/>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <router-link to="/hello">hello</router-link><br>
    <router-link to="/test">test</router-link>
    <app-login/> -->
    <div v-show="GET_LOADING" class="flex justify-center items-center mt-20 ">
      <div  class="w-10 aspect-square rounded-full bg-transparent  border-4 border-r-blue-400 animate-spin"></div>
    </div>
     
    <router-view v-if="!GET_LOADING"/>
    <app-toast v-if="this.GET_TOAST_SHOW" :msg="this.GET_TOAST_MSG" :type="this.GET_TOAST_TYPE"/>
  </div>
</template>

<script>

import AppToast from './components/AppToast.vue'
import {mapGetters} from 'vuex'
import AppHeader from './components/AppHeader.vue';
import { getAuth } from '@firebase/auth';

export default {
  name: 'App',
  components: {
    // 'app-login':  AppLogin,
    'app-toast':  AppToast,
    'app-header':  AppHeader,
  },
  data(){
    return{
      auth:null,
      checkRouter:null,
    }
  },
  computed:{
    ...mapGetters([
      "GET_TOAST_SHOW",
      "GET_TOAST_MSG",
      "GET_TOAST_TYPE",
      "GET_LOADING"
    ]),
    isNotLoginSignUp() {
    return this.$route.path !== "/login" &&  this.$route.path !== "/signUp";
    }
  },
  created(){
    const user = getAuth().currentUser
    if (user){
      this.$store.commit('SET_LOGGEDIN',true)
    }
        
  },
  
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
