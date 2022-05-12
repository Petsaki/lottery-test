<template>
  <div class="fixed z-30 top-0 right-0 min-h-screen min-w-full bg-gray-500/70 flex justify-center items-center">
        <div class="bg-white p-5 border-2 rounded-md max-w-xl w-3/4">
            <div class="pb-6 text-lg font-semibold">
                {{moneyWon > 0 ? 'Congratulations! You just won: ' + moneyWon + "€" : "You didn't won anything. Better luck next time!"}}
            </div>
            <div class="flex justify-between">
                <button @click.once="saveDraw()" class="bg-orange-500 text-white font-semibold rounded-md px-2 py-1 h-fit whitespace-nowrap">Save to History</button>
                <router-link to="/"  class="text-blue-600 font-semibold rounded-md px-2 py-1 h-fit whitespace-nowrap">Go back</router-link>
            </div>
        </div>
    </div>
</template>

<script>

import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
    name: 'AppModal',
    props:{
        moneyWon: Number,
        drawTime: Date,
    },
    methods:{
        async saveDraw(){
            console.log(this.moneyWon)
            console.log(this.drawTime)

            const auth = getAuth();
            const user = auth.currentUser;
            if (user){
                try {
                    await addDoc(collection(getFirestore(),"users", user.uid,"history"), {
                    drawTime: this.drawTime, 
                    drawNums:this.$store.getters.getCurrentDraw,
                    playerNums:this.$store.getters.playerNums,
                    totalWon:this.moneyWon,
                    
                },{ merge: true });
                // Sto telos edw mporw na balw ,{ merge: true } (meta apo to }) kai na mhn kanei overwrite
                } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        this.$router.push({ path: '/' })
        },
    },
}
</script>

<style>

</style>