<template>
    <div>
        <app-header/>
         <div class="flex flex-col  max-w-7xl mx-auto my-5">
             <router-link to="/history" class="pl-8 mb-5">	
                &#10094; Go back
            </router-link>
            <div class="w-full flex flex-col items-center box-border bg-white rounded-md shadow-md">
                        
                    <div class="flex w-full gap-1">
                        <span class="font-semibold flex-1 flex justify-end items-center">Draw date:</span> 
                        <div class="flex-1"> {{drawTime ? drawTime.toUTCString().split(' ').slice(0, 5).join(' ') : ""}}</div> 
                    </div>

                    <div class="flex w-full gap-1">
                        <span class="font-semibold flex-1 flex justify-end items-center">Status:</span> 
                        <div class="flex-1"> {{moneyWon !== 0 ? "Won" : "Lost"}}</div> 
                    </div>

                    <div class="flex w-full gap-1">
                        <span class="font-semibold flex-1 flex justify-end items-center">Money won:</span> 
                        <div class="flex-1"> {{moneyWon}}</div> 
                    </div>
                    <div class="flex gap-5 mt-5 w-full">

                        <div class="flex flex-col items-center flex-1">
                            <span class="font-semibold mb-3">Drawed Numbers:</span>
                            <div v-for="num in drawedNums" :key="num" class="flex flex-col mb-3">
                                <button class="rounded-full disabled:grayscale bg-gradient-to-br from-yellow-300 to-yellow-500 w-20 sm:w-24 font-bold text-gray-700 aspect-square flex justify-center items-center cursor-default">
                                    {{ num }}
                                </button>
                            </div>
                        </div>

                        <div class="flex flex-col items-center flex-1">
                            <span class="font-semibold mb-3">Your Numbers:</span>
                            <div v-for="num in selectedNums" :key="num" class="flex flex-col mb-3">
                                <button :class="[ drawedNums.includes(num)  ? 'from-green-300 to-green-500': 'from-yellow-300 to-yellow-500' ]" class="rounded-full  bg-gradient-to-br  w-20 sm:w-24 font-bold text-gray-700 aspect-square flex justify-center items-center cursor-default">
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

import AppHeader from '../components/AppHeader.vue';
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


export default {
    name: 'HistoryDetails',
    components: {
    'app-header':  AppHeader,
    },
    data(){
        return{
            id: this.$route.params,
            selectedNums:null,
            drawedNums:null,
            moneyWon:null,
            drawTime: null,
        }
    },
    async created(){
        const auth = getAuth();
        const user = auth.currentUser;
        if (user){
            try {
                const historyDetails = await getDoc(doc(getFirestore(), "users", user.uid, "history", this.id.id));
                console.log()
                 this.selectedNums = (historyDetails.data().playerNums);
                    this.drawedNums = (historyDetails.data().drawNums);
                    this.moneyWon = (historyDetails.data().totalWon);
                    this.drawTime = (historyDetails.data().drawTime.toDate());
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
}
</script>

<style>

</style>