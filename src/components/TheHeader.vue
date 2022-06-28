<template>
    <div class="bg-sky-400 shadow-md ">
        <div class="max-w-7xl mx-auto flex flex-row justify-between gap-1 items-center py-2 sm:py-5 px-2 md:px-4">
            <div class="self-start ">
                <img @click="goAtMain" alt="Logo Image" src="../assets/lottery_logo_2.png" class="app-img-logo"/>
            </div>
            <nav class="text-white">
                <ul class="flex gap-3 sm:gap-7 flex-wrap-reverse justify-end">
                    <div class="flex gap-3 justify-end sm:justify-center items-center flex-wrap">
                        <li >
                            <base-button tagProp="router-link" toProp="/" class="bg-blue-700">Home</base-button>
                        </li>
                        <li>
                            <base-button @click.native="goAtDraw" class="bg-blue-700">Live Draw</base-button>
                        </li>
                        <li>
                            <base-button tagProp="router-link" toProp="/history" class="bg-blue-700">History</base-button>
                        </li>
                    </div>
                
                    <div class="flex gap-2 justify-center items-center">
                        <img alt="User's Image" src="../assets/logo.png" tabindex="0" class="w-12 h-12 bg-center object-cover bg-no-repeat rounded-full border-dashed border"/>
                         <base-button @click.native="logout" class="bg-red-600">Log Out</base-button>
                    </div>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import BaseButton from './BaseButton.vue';

export default {
    components: {
        'base-button':  BaseButton,
    },
    methods:{
        logout(){
            const auth = getAuth();
            signOut(auth).then(() => {
                this.$router.push({ path: '/login' })
                this.$store.commit('SET_UPDATEHISTORY',true)  
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