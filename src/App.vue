<template>
  <div class="min-h-screen bg-cyan-100">
    <app-header  v-if="this.$store.getters.loggedIn"/>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <router-link to="/hello">hello</router-link><br>
    <router-link to="/test">test</router-link>
    <app-login/> -->
    <router-view/>
    <app-toast v-if="this.toastShow" :msg="this.toastMsg" :type="this.toastType"/>
  </div>
</template>

<script>

import AppToast from './components/AppToast.vue'
import {mapGetters} from 'vuex'
import AppHeader from './components/AppHeader.vue';

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
      "toastShow",
      "toastMsg",
      "toastType"
    ]),
    isNotLoginSignUp() {
    return this.$route.path !== "/login" &&  this.$route.path !== "/signUp";
    }
  },
  
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
