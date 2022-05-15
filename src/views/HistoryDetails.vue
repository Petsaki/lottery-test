<template>
    <div v-if="this.$store.getters.IS_LOGGEDIN" class="max-w-7xl mx-auto">
         <div class="flex flex-col py-5 px-3">
             <router-link to="/history" class="pl-8 mb-5">	
                &#10094; Go back
            </router-link>
            <div class="w-full flex flex-col items-center box-border bg-white rounded-md shadow-md">
                        
                        <span class="font-semibold flex-1 flex justify-end items-center">Draw date:</span> 
                        <div class="flex-1"> {{drawTime ? drawTime.toUTCString().split(' ').slice(0, 5).join(' ') : ""}}</div> 

          
                        <span class="font-semibold flex-1 flex justify-end items-center">Status:</span> 
                        <div class="flex-1"> {{moneyWon !== 0 ? "Won" : "Lost"}}</div> 

                        <span class="font-semibold flex-1 flex justify-end items-center">Money won:</span> 
                        <div class="flex-1"> {{moneyWon > 0 ? moneyWon : '-'}}</div> 
                        
                    <div class="flex gap-5 mt-5 w-full">

                        <div class="flex flex-col items-center flex-1">
                            <span class="font-semibold mb-3 text-center">Drawed Numbers:</span>
                            <div v-for="num in drawedNums" :key="num" class="flex flex-col mb-3">
                                <button class="rounded-full disabled:grayscale bg-gradient-to-br from-yellow-300 to-yellow-500 w-20 sm:w-24 font-bold text-gray-700 aspect-square flex justify-center items-center cursor-default">
                                    {{ num }}
                                </button>
                            </div>
                        </div>

                        <div class="flex flex-col items-center flex-1">
                            <span class="font-semibold mb-3 text-center">Your Numbers:</span>
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
        }
    },
    async created(){
        const auth = getAuth();
        const user = auth.currentUser;
        if (user){
            console.log("Call to firebase")
            try {
                const historyDetails = await getDoc(doc(getFirestore(), "users", user.uid, "history", this.id.id));
                 this.selectedNums = (historyDetails.data().playerNums);
                    this.drawedNums = (historyDetails.data().drawNums);
                    this.moneyWon = (historyDetails.data().totalWon);
                    this.drawTime = (historyDetails.data().drawTime.toDate());
            } catch {
                this.$router.push({ path: '/history' })
            }
        }
    }
}
</script>

<style>

</style>