<template>
  <div class="min-h-screen flex justify-center items-center sm:items-start sm:pt-36" v-if="!this.$store.getters.IS_LOGGEDIN">
    <form @submit.prevent="login" class="flex flex-col h-fit justify-start items-center gap-5 bg-white px-5 sm:px-12 border-2 rounded-md border-black pt-5 pb-8">
        <img alt="Logo Image" src="../assets/logo.png" class="app-img-logo"/>
          <app-input labelProp="Enter your email:">
            <input type="email" required autofocus v-model="form.email" class="app-input"/>
          </app-input>
          <app-input labelProp="Enter your password:">
            <input type="password" required minlength="8" v-model="form.password" autocomplete="on" class="app-input"/>
          </app-input>
          <div class="flex justify-between w-full text-white pt-3">
            <app-button tagProp="input" typeProp="submit" valueProp="Log in" class="bg-blue-400"/>
            <app-button tagProp="router-link" toProp="/signUp" class="bg-green-400">Sign up</app-button> 
          </div>
          <div v-show="loading" class="app-loading-circle"></div>
    </form>
  </div>
</template>

<script>

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';


export default {
  name: 'AppLogin',
  components: {
    'app-button':  AppButton,
    'app-input':  AppInput,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$store.dispatch('SET_TOAST',{
        show:false,
        msg:"",
        type:""
      })
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then(() => {
          if (this.$store.getters.GET_DRAWINPROG){
            this.$router.push({ path: '/liveDraw' })
          }else{
            this.$router.push({ path: '/' })
          }
            
        })
        .catch((error) => {
          this.loading = false;              
          this.$store.dispatch('SET_TOAST',{
            show:true,
            msg:error.message,
            type:"error"
          })
        });
    }
  },
}
</script>

<style>

</style>