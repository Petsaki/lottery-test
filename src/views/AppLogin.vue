<template>
  <div class="min-h-screen flex justify-center py-20" v-if="!this.$store.getters.IS_LOGGEDIN">
        <form @submit.prevent="login" class="flex flex-col h-fit justify-start items-center gap-4 bg-white px-12 border-2 rounded-md border-black pt-5 pb-28">
          <img alt="Logo Image" src="../assets/logo.png" class="w-24"/>
            <label for="name">Enter your email: </label>
            <input type="email" required autofocus v-model="form.email" class="bg-slate-300 rounded-md font-semibold px-1"/>
            <label for="name">Enter your password: </label>
            <input type="password" required minlength="8" v-model="form.password" autocomplete="on" class="bg-slate-300 rounded-md font-semibold px-1"/>
            <div class="flex justify-between w-full"> 
                <input type="submit" value="Log In" class="bg-blue-400 rounded-md text-white px-2 cursor-pointer">
                <router-link to="/signUp" class="bg-green-400 rounded-md text-white px-2 cursor-pointer">Sign up</router-link>
            </div>
            <div v-show="loading" class="w-10 aspect-square rounded-full bg-transparent  border-4 border-r-blue-400 animate-spin"></div>
        </form>
  </div>
</template>

<script>

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import store from '../../store'


export default {
    name: 'AppLogin',
    components: {
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
        .then((userCredential) => {

            const user = userCredential.user;
            console.log(user)
            // this.$store.commit('SET_LOGGEDIN', true)
            // this.$store.commit('SET_USER', user.email)
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