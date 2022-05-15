<template>
    <div class="fixed z-30 top-0 right-0 min-h-screen min-w-full bg-gray-500/70 flex justify-center items-center">
        <div class="bg-white p-3 sm:p-5 border-2 rounded-md max-w-xl w-3/4">
            <div class="pb-6 text-lg font-semibold">
                {{moneyWon > 0 ? 'Congratulations! You just won: ' + moneyWon + "€" : "You didn't won anything. Better luck next time!"}}
            </div>
            <div class="flex justify-between flex-wrap">
                <button
                    @click.once="saveDraw()" 
                    class="app-btn bg-orange-500 text-white">
                        Save to History
                </button>
                <button
                    @click.once="goAtMain()"
                    class="app-btn text-blue-600">
                        Go back
                </button>
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
            this.$store.dispatch('SET_TOAST',{
                show:false,
                msg:"",
                type:""
            })
            const auth = getAuth();
            const user = auth.currentUser;
            if (user){
                try {
                    await addDoc(collection(getFirestore(),"users", user.uid,"history"), {
                        drawTime: this.drawTime, 
                        drawNums:this.$store.getters.GET_CURRENTDRAWS,
                        playerNums:this.$store.getters.GET_PLAYERNUMS,
                        totalWon:this.moneyWon,         
                    },{ merge: true });

                    this.$store.dispatch('SET_TOAST',{
                        show:true,
                        msg:"Draw saved to history successfully!",
                        type:"success"
                    })
                } catch (e) {
                console.error("Error adding document: ", e);
                }
            }
            this.goAtMain();
        },
        goAtMain(){
            this.$store.commit('CLEAR_PLAYERNUMS', []);
            this.$store.commit('CLEAR_CURRENTDRAW', []);
            this.$router.push({ path: '/' })
        }
    },    
}
</script>

<style>

</style>