<template>
  <div class="min-h-screen flex justify-center items-center sm:items-start sm:pt-36" v-if="!this.$store.getters.IS_LOGGEDIN">
    <form @submit.prevent="signUp" class="flex flex-col h-fit justify-start items-center gap-5 bg-white px-5 sm:px-12  rounded-md border-2 border-black pt-5 pb-8">
      <img alt="Logo Image" src="../assets/logo.png" class="app-img-logo"/>
      <app-input labelProp="Enter your email:">
        <!-- Removed the v-model because i didnt really neeb the values to be up to date everytime but only when user submit :) -->
        <!-- <input type="email" required autofocus v-model="form.email" class="app-input"/> -->
        <input type="email" required autofocus v-model="form.email" name="email" class="app-input"/>
      </app-input>

      <app-input labelProp="Enter your password:">
        <input type="password" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" name="password"
          title="Must be 8 length at least and has 1 [A-Z], 1 [a-z], 1 [0-9]."
          class="app-input"/>
      </app-input>
      
      <app-input labelProp="Confirm password:">
        <input type="password" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" name="confirmpass"
          title="Must be 8 length at least and has 1 [A-Z], 1 [a-z], 1 [0-9]."
          class="app-input"/>
      </app-input>

      <div class="flex justify-center flex-col gap-4 w-fit pt-3">
        <app-button tagProp="input" typeProp="submit" valueProp="Sign up" class="bg-green-400 text-white"/>
        <app-button tagProp="router-link" toProp="/login" class="text-blue-500 underline decoration-blue-500">Log in</app-button>
      </div>
      <app-circle-loading :loadingProp="loading"/>
    </form>
  </div>
</template>

<script>

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore} from "firebase/firestore";
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import AppCircleLoading from '@/components/AppCircleLoading.vue';

export default {
  components: {
    'app-button':  AppButton,
    'app-input':  AppInput,
    'app-circle-loading':  AppCircleLoading,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmpass: "",
      },
      loading:false,
    };
  },
  methods: {
    async signUp(e) {
      this.form.email = e.target.elements.email.value;
      this.form.password = e.target.elements.password.value;
      this.form.confirmpass = e.target.elements.confirmpass.value;
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
            try {
              setDoc(doc(getFirestore(), "users", user.uid), {
                drawRunning: false,
                currentNums:[],
                currentDraw:[],
                email:user.email,
              },{ merge: true });
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