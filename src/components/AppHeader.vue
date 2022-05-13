<template>
  <div class="bg-blue-400 shadow-md shadow-gray-400/80">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center py-5 px-2 md:px-4">
          <div class="self-start">
              <img @click="goAtMain" alt="Logo Image" src="../assets/logo.png" class="w-24 cursor-pointer"/>
          </div>
        <nav class="text-white ">
            <ul class="flex gap-7 flex-wrap justify-end">
                <div class="flex gap-3 justify-center items-center">
                    <li >
                    <router-link to="/"  class="font-semibold bg-blue-600 rounded-md px-2 py-[6px] h-min  whitespace-nowrap">Home</router-link>
                    </li>
                    <li>
                    <button @click="goAtDraw" class="font-semibold bg-blue-600  rounded-md px-2 py-[6px] h-min whitespace-nowrap text leading-[21px]">Live Draw</button>
                    </li>
                    <li>
                    <router-link  to="/history" class="font-semibold bg-blue-600 rounded-md px-2 py-[6px] h-min ">History</router-link>
                    </li>
                </div>
                
                <div class="flex gap-2 justify-center items-center ">
                    <img alt="User's Image" src="../assets/logo.png" class="w-12 aspect-square rounded-full border-dashed border"/>
                    <button @click="logout" class="bg-red-600 font-semibold rounded-md px-2 py-[6px] h-min whitespace-nowrap leading-[21px]">Log Out</button>
                </div>
            </ul>
        </nav>
      </div>
  </div>
</template>

<script>
// import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";

export default {

    methods:{
        logout(){
            const auth = getAuth();
            this.$store.commit('UPDATE_LOGGEDIN', false)
            this.$store.commit('UPDATE_USER', null)
            this.$store.commit('DELETE_PLAYERNUMS', [])
            this.$store.commit('UPDATE_CURRENTDRAW', [])
            
            signOut(auth).then(() => {
                this.$router.push({ path: '/login' })  
            }).catch((error) => {
                console.log(error)
            });
        },
        goAtMain(){
            if (this.$router.currentRoute.path !== '/'){
                this.$router.push({ path: '/' })
            }
            
        },
        async goAtDraw(){
            console.log("CLICKED!")

            // Bug: here it has the issue with the redundant navigation
            if (this.$store.getters.playerNums.length === 5){
                this.$store.commit('UPDATE_DRAWINPROG', true)
            
            
            

            const auth = getAuth();
            const user = auth.currentUser;
            if (user){
                try {
                    await setDoc(doc(getFirestore(), "users", user.uid), {
                        currentNums: this.$store.getters.playerNums,
                        drawRunning: this.$store.getters.getDrawInProg,
                    },{ merge: true });
                // Sto telos edw mporw na balw ,{ merge: true } (meta apo to }) kai na mhn kanei overwrite
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }

            if (this.$router.currentRoute.path !== '/liveDraw'){
                this.$router.push({ path: '/liveDraw' })
            }
        }
        }
        
    },
    

    created(){
        // const auth = getAuth();
        // onAuthStateChanged(auth, (user) => {
        //     console.log(user);
        // if (user) {
        //     this.$store.commit('UPDATE_LOGGEDIN', true)
        //     this.$store.commit('UPDATE_USER', user.email)
        // } else {
        //     this.$store.commit('UPDATE_LOGGEDIN', false)
        //     this.$store.commit('UPDATE_USER', null)
        //     this.$router.push({ path: '/login' })
        // }
        // });

        
    },
    mounted() {
        this.$root.$on('headerComponent', () => {
        this.goAtDraw()
    })
    }
    
}
</script>

<style>

</style>