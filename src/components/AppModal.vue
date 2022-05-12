<template>
  <div class="fixed z-30 top-0 right-0 min-h-screen min-w-full bg-gray-500/70 flex justify-center items-center">
        <div class="bg-white p-3 sm:p-5 border-2 rounded-md max-w-xl w-3/4">
            <div class="pb-6 text-lg font-semibold">
                {{moneyWon > 0 ? 'Congratulations! You just won: ' + moneyWon + "€" : "You didn't won anything. Better luck next time!"}}
            </div>
            <div class="flex justify-between flex-wrap">
                <button @click.once="saveDraw()" class="bg-orange-500 text-white font-semibold rounded-md px-2 py-1 h-fit whitespace-nowrap">Save to History</button>
                <button @click.once="goAtMain()"  class="text-blue-600 font-semibold rounded-md px-2 py-1 h-fit whitespace-nowrap">Go back</button>
            </div>
        </div>
    </div>
</template>

<script>

import { addDoc,setDoc,doc, collection, getFirestore } from "firebase/firestore";
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
            this.goAtMain();
        },
        goAtMain(){
            this.$store.commit('DELETE_PLAYERNUMS', []);
            this.$store.commit('UPDATE_CURRENTDRAW', []);
            this.$router.push({ path: '/' })
        }
    },
    async beforeDestroy(){

            const auth = getAuth();
            const user = auth.currentUser;
            if (user){
                try {
                    await setDoc(doc(getFirestore(), "users", user.uid), {
                        currentNums: this.$store.getters.playerNums,
                        drawRunning: this.$store.getters.getDrawInProg,
                    },{ merge: true });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
    },
        
}
</script>

<style>

</style>