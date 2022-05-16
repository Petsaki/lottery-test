<template>
    <div class="bg-sky-400 shadow-md ">
        <div class="max-w-7xl mx-auto flex flex-row justify-between items-center py-5 px-2 md:px-4">
            <div class="self-start w-20 sm:w-24">
                <img @click="goAtMain" alt="Logo Image" src="../assets/logo.png" class="cursor-pointer"/>
            </div>
            <nav class="text-white">
                <ul class="flex gap-7 flex-wrap-reverse justify-end">
                    <div class="flex gap-3 justify-end sm:justify-center items-center flex-wrap">
                        <li >
                            <router-link to="/"  class="app-btn bg-blue-700">Home</router-link>
                        </li>
                        <li>
                            <button @click="goAtDraw" class="app-btn bg-blue-700">Live Draw</button>
                        </li>
                        <li>
                            <router-link  to="/history" class="app-btn bg-blue-700">History</router-link>
                        </li>
                    </div>
                
                    <div class="flex gap-2 justify-center items-center ">
                        <img alt="User's Image" src="../assets/logo.png" class="w-12 aspect-square rounded-full border-dashed border"/>
                        <button
                            @click="logout"
                            class="app-btn bg-red-600">
                                Log Out
                        </button>
                    </div>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
    methods:{
        logout(){
            const auth = getAuth();
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
            // Bug: here it has the issue with the redundant navigation
            if (this.$store.getters.GET_PLAYERNUMS.length === 5){
                this.$store.commit('SET_DRAWINPROG', true)
                if (this.$router.currentRoute.path !== '/liveDraw'){
                    this.$router.push({ path: '/liveDraw' })
                }
            }
        }
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