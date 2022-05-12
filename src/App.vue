<template>
  <div class="min-h-screen bg-cyan-100">
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

export default {
  name: 'App',
  components: {
    // 'app-login':  AppLogin,
    'app-toast':  AppToast,
  },
  computed:{
    ...mapGetters([
      "toastShow",
      "toastMsg",
      "toastType"
    ])
  }
  
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
