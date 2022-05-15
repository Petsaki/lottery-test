<template>
    <div class="min-h-screen flex justify-center py-20" v-if="!this.$store.getters.IS_LOGGEDIN">
        <form @submit.prevent="signUp" class="flex flex-col h-fit justify-start items-center gap-4 bg-white px-12  rounded-md border-2 border-black pt-5 pb-28">
          <img alt="Logo Image" src="../assets/logo.png" class="w-24"/>
            <label for="name">Enter your email: </label>
            <input type="email" required autofocus v-model="form.email" class="bg-slate-300 px-1 rounded-md font-semibold"/>
            <label for="name">Enter your password: </label>
            <input type="password" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" v-model="form.password" class="bg-slate-300 px-1 font-semibold rounded-md"/>
            <label for="name">Confirm password:</label>
            <input type="password" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" v-model="form.confirmpass" class="bg-slate-300 px-1 font-semibold rounded-md"/>
            <div class="flex justify-center flex-col gap-4 w-fit"> 
                <input type="submit" value="Sign up" class="bg-green-400 rounded-md text-white px-2 cursor-pointer text-center">
                <router-link to="/login" class="text-blue-500 underline rounded-md decoration-blue-500 color under px-2 cursor-pointer text-center">Log In</router-link>
            </div>
            <div v-show="loading" class="w-10 aspect-square rounded-full bg-transparent  border-4 border-r-blue-400 animate-spin"></div>
        </form>
  </div>
</template>

<script>

// import firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore} from "firebase/firestore";


export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmpass: "",
      },
      error: null,
      loading:false,
    };
  },
  methods: {
    async signUp() {
            this.$store.dispatch('SET_TOAST',{
              show:false,
              msg:"",
              type:""
            }) 
        if (this.form.password === this.form.confirmpass){
          this.loading = true;
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
            .then((userCredential) => {
            // this.$store.commit('SET_LOGGEDIN',true);
            const user = userCredential.user;
            console.log(user)

                try {
                    setDoc(doc(getFirestore(), "users", user.uid), {
                    drawRunning: false,
                    currentNums:[],
                    currentDraw:[],
                    email:user.email,
                },{ merge: true });
                // Sto telos edw mporw na balw ,{ merge: true } (meta apo to }) kai na mhn kanei overwrite
                } catch (e) {
                console.error("Error adding document: ", e);
                }
            this.loading=false;

              this.$store.dispatch('SET_TOAST',{
              show:true,
              msg:"Making a account was successfully!",
              type:"success"
            }) 
            this.$router.push({ path: '/' })
            })
            .catch((error) => {
              this.loading=false;
              this.$store.dispatch('SET_TOAST',{
                show:true,
                msg:"Failed to sign up.",
                type:"error"
              }) 
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage )
            });

        }else{
          setTimeout(() =>{
              this.$store.dispatch('SET_TOAST',{
                show:true,
                msg:"Passwords do not match!",
                type:"error"
              }) 
          },100);
            
            
        }

      
    }
  },
}
</script>

<style>

</style>