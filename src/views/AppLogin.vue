<template>
  <div class="min-h-screen flex justify-center items-center">
        <form @submit.prevent="login" class="flex flex-col justify-start items-center gap-4 bg-white px-12 border rounded-md border-black pt-12 pb-28">
            <label for="name">Enter your email: </label>
            <input type="email" required autofocus v-model="form.email" class="bg-slate-200 rounded-md"/>
            <label for="name">Enter your password: </label>
            <input type="password" required minlength="8" v-model="form.password" class="bg-slate-200 rounded-md"/>
            <div class="flex justify-between w-full"> 
                <input type="submit" value="Log In" class="bg-blue-400 rounded-md text-white px-2 cursor-pointer">
                <router-link to="/signUp" class="bg-green-400 rounded-md text-white px-2 cursor-pointer">Sign up</router-link>
            </div>
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
    };
  },
  methods: {
    login() {
        this.$store.commit('UPDATE_TOAST',
              {show:false, msg:"", type:""}
        );
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then((userCredential) => {

            const user = userCredential.user;
            console.log(user)
            this.$store.commit('UPDATE_LOGGEDIN', true)
            this.$store.commit('UPDATE_USER', user.email)
            this.$router.push({ path: '/' })
        })
        .catch((error) => {
            this.$store.commit('UPDATE_TOAST',
              {show:true, msg:"Failed to logged in.", type:"error"}
              );
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
            }
  },

  
}
</script>

<style>

</style>