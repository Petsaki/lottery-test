<template>
    <div v-if="this.$store.getters.IS_LOGGEDIN" class="max-w-7xl mx-auto">
        <div class="flex flex-col py-5 px-3">
            <router-link to="/history" class="pl-8 mb-5">	
                &#10094; Go back
            </router-link>
            <div v-show="loading" class="app-loading-circle mx-auto"></div>
            <div v-show="!loading" class="relative w-full flex flex-col items-center box-border bg-white rounded-md shadow-md">
                <div class="flex flex-col items-center z-30">
                    <span class="font-semibold flex-1 flex justify-end items-center">Draw date:</span> 
                    <div class="flex-1"> {{drawTime ? drawTime.toUTCString().split(' ').slice(0, 5).join(' ') : ""}}</div> 


                    <span class="font-semibold flex-1 flex justify-end items-center">Status:</span> 
                    <div class="flex-1"> {{moneyWon !== 0 ? "Won" : "Lost"}}</div> 

                    <span class="font-semibold flex-1 flex justify-end items-center">Money won:</span> 
                    <div class="flex-1"> {{moneyWon > 0 ? moneyWon : '-'}}</div> 
                </div>       
                        
                <div class="flex gap-5 mt-5 w-full relative md:absolute bg-white rounded-md shadow-md">

                    <div class="flex flex-col items-center flex-1 ">
                        <span class="font-semibold mb-3 text-center">Drawed Numbers:</span>
                        <div v-for="num in drawedNums" :key="num" class="flex flex-col mb-3">
                            <button class="app-ball cursor-default">
                                {{ num }}
                            </button>
                        </div>
                    </div>

                    <div class="flex flex-col items-center flex-1">
                        <span class="font-semibold mb-3 text-center">Your Numbers:</span>
                        <div v-for="num in selectedNums" :key="num" class="flex flex-col mb-3">
                            <button :class="[ drawedNums.includes(num)  ? 'shadow-3d-match sm:shadow-3d-match-sm': 'shadow-3d sm:shadow-3d-sm' ]"
                                class="app-ball cursor-default">
                                {{ num }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script>

import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
    name: 'HistoryDetails',
    data(){
        return{
            id: this.$route.params,
            selectedNums:null,
            drawedNums:null,
            moneyWon:null,
            drawTime: null,
            loading:true,
        }
    },
    async created(){
        const auth = getAuth();
        const user = auth.currentUser;
        if (user){
            try {
                const historyDetails = await getDoc(doc(getFirestore(), "users", user.uid, "history", this.id.id));
                this.selectedNums = (historyDetails.data().playerNums);
                this.drawedNums = (historyDetails.data().drawNums);
                this.moneyWon = (historyDetails.data().totalWon);
                this.drawTime = (historyDetails.data().drawTime.toDate());
            } catch {
                this.$router.push({ path: '/history' })
            }finally{
                this.loading= false;
            }
        }
    }
}
</script>

<style>

</style>