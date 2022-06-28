<template>
  <div class="min-h-screen bg-svg-bg bg-fixed">
    <the-header  v-if="this.$store.getters.IS_LOGGEDIN"/>
    <div v-show="GET_LOADING" class="flex justify-center items-center pt-20 ">
      <circle-loading class="absolute top-[calc(50%-40px)] mx-auto"/>
    </div>
     
    <!-- <router-view v-if="!GET_LOADING"/> -->


    <!-- <transition 
        :name="slideDirection" mode="out-in"> -->
      <keep-alive include="AppHistory"> 
        <router-view v-if="!GET_LOADING"/>
      </keep-alive>
    <!-- </transition> -->

    <the-toast v-if="this.GET_TOAST_SHOW" :msg="this.GET_TOAST_MSG" :type="this.GET_TOAST_TYPE"/>
  </div>
</template>

<script>

import TheToast from './components/TheToast.vue'
import {mapGetters} from 'vuex'
import TheHeader from './components/TheHeader.vue';
import { getAuth } from '@firebase/auth';
import CircleLoading from './components/CircleLoading.vue';

export default {
  name: 'App',
  components: {
    'the-toast':  TheToast,
    'the-header':  TheHeader,
    'circle-loading':  CircleLoading,
  },
  data(){
    return{
      auth:null,
      checkRouter:null,
      // slideLeft:true,
    }
  },
  // watch:{
  //   $route (to,from){
  //       if ((to.path === '/history' && from.path.indexOf("/history/") !== -1)
  //         || (from.path === '/history' && to.path.indexOf("/history/") !== -1 )
  //         || (from.path === '/' && to.path === '/liveDraw')){
  //         this.slideLeft = false;
  //       }else{
  //         this.slideLeft = true;
  //       }
  //   }
  // }, 
  computed:{
    ...mapGetters([
      "GET_TOAST_SHOW",
      "GET_TOAST_MSG",
      "GET_TOAST_TYPE",
      "GET_LOADING"
    ]),
    isNotLoginSignUp() {
      return this.$route.path !== "/login" &&  this.$route.path !== "/signUp";
    },
    // slideDirection(){
    //   return this.slideLeft ? 'fade2' : 'fade';
    // },
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

@layer components {
  .app-btn {
    @apply font-semibold  rounded-md px-2 py-[6px] whitespace-nowrap leading-[21px] text-center cursor-pointer;
  }
  .app-loading-circle {
    @apply w-10 aspect-square rounded-full bg-transparent  border-4 border-r-blue-400 animate-spin;
  }
  .app-input {
    @apply bg-slate-300 rounded-md font-semibold px-1;
  }
  .app-ball {
    @apply flex justify-center items-center rounded-full shadow-md shadow-gray-500/60 shadow-3d text-sm sm:text-lg w-14 sm:w-24 sm:shadow-3d-sm font-bold text-gray-900 aspect-square;
  }
  .shadow-3d-sm {
    background: radial-gradient(circle at 32px 32px, #fde047, #a16207);
  }
  .shadow-3d {
    background: radial-gradient(circle at 18px 18px, #fde047, #a16207);
  }
  .shadow-3d-match-sm {
    background: radial-gradient(circle at 32px 32px, #86efac, #15803d);
  }
  .shadow-3d-match {
    background: radial-gradient(circle at 18px 18px, #86efac, #15803d);
  }
  .app-img-logo {
    @apply block cursor-pointer object-scale-down w-[128px] min-w-[40px];
  }
}

@layer base {
  dialog::backdrop {
    @apply bg-gray-600/40
  }
  /* ... */
}

/* .fade-enter-active,
.fade-leave-active {
  @apply transition duration-700 ease-in-out;

}
.fade-enter{
  @apply translate-x-full opacity-40;
}
.fade-leave-to {
  @apply -translate-x-full opacity-40;
}

.fade-enter-to{
  @apply translate-x-0 opacity-100
}
.fade-leave {
  @apply translate-x-0 opacity-100;
} */

/* .fade2-enter-active,
.fade2-leave-active {
  @apply transition duration-500 ease-out;

}
.fade2-enter
.fade2-leave-to {
  @apply translate-x-full;
} */

/* .fade2-enter-to,
.fade2-leave {
  @apply -translate-x-full;
} */
</style>
