<template>
        <dialog ref="dialog" class="bg-white p-3 sm:p-5 border-2 rounded-md max-w-xl w-3/4">
            <div class="pb-6 text-lg font-semibold">
                {{moneyWon > 0 ? 'Congratulations! You just won: ' + moneyWon + "€" : "You didn't won anything. Better luck next time!"}}
            </div>
            <div class="flex justify-between flex-wrap">
                <app-button @click.native.once="saveDraw()" class="bg-orange-500 text-white">
                    Save to History
                </app-button>
                <app-button @click.native.once="goAtMain()" class="text-blue-600">
                    Go back
                </app-button>
            </div>
        </dialog>
</template>

<script>

import { addDoc, collection, getFirestore } from "firebase/firestore";
import AppButton from './AppButton.vue';

export default {
    name: 'AppModal',
    components: {
        'app-button':  AppButton,
    },
    props:{
        moneyWon: Number,
        drawTime: Date,
        showModal: Boolean,
    },
    watch:{
        showModal(showModal){
            this.$nextTick(() =>{
                showModal ? this.$refs.dialog.showModal() : this.$refs.dialog.close();
            })
        }
    },
    created(){
        this.escapeHandler = (e) => {
            if (e.key === "Escape" && this.showModal){
                this.goAtMain();
            }
        }
        document.addEventListener('keydown',this.escapeHandler);
    },
    destroyed(){
        document.removeEventListener('keydown',this.escapeHandler);
    },
    methods:{
        async saveDraw(){
            this.$store.dispatch('SET_TOAST',{
                show:false,
                msg:"",
                type:""
            })
            if (this.$user){
                try {
                    await addDoc(collection(getFirestore(),"users", this.$user.uid,"history"), {
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