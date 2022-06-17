<template>
    <div v-if="this.$store.getters.IS_LOGGEDIN" class="max-w-7xl mx-auto">
        <div class="flex flex-col py-5 px-3">
            <app-button @click.native="goBack" class="pl-8 mb-5 flex">&#10094; Go back</app-button>
            <app-circle-loading :loadingProp="loading" class="mx-auto"/>
            <div v-show="!loading" class="relative w-full flex flex-col items-center box-border bg-white rounded-md shadow-md">
                <div class="flex flex-col items-center z-30">
                    <span class="font-semibold flex-1 flex justify-end items-center">Draw date:</span> 
                    <div class="flex-1"> {{drawTime ? drawTime : ""}}</div> 


                    <span class="font-semibold flex-1 flex justify-end items-center">Status:</span> 
                    <div class="flex-1"> {{moneyWon !== 0 ? "Won" : "Lost"}}</div> 

                    <span class="font-semibold flex-1 flex justify-end items-center">Money won:</span> 
                    <div class="flex-1"> {{moneyWon > 0 ? moneyWon : '-'}}</div> 
                </div>       
                        
                <div class="flex gap-5 mt-5 w-full relative md:absolute bg-white rounded-md shadow-md">

                    <div class="flex flex-col items-center flex-1 ">
                        <span class="font-semibold mb-3 text-center">Drawed Numbers:</span>
                        <div v-for="num in drawedNums" :key="num" class="flex flex-col mb-3">
                            <app-ball :numProp="num"/>
                        </div>
                    </div>

                    <div class="flex flex-col items-center flex-1">
                        <span class="font-semibold mb-3 text-center">Your Numbers:</span>
                        <div v-for="num in selectedNums" :key="num" class="flex flex-col mb-3">
                            <app-ball :numProp="num" :class="[ drawedNums.includes(num)  ? 'shadow-3d-match sm:shadow-3d-match-sm': 'shadow-3d sm:shadow-3d-sm' ]"/>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script>

import { getFirestore, getDoc, doc } from "firebase/firestore";
import AppCircleLoading from '@/components/AppCircleLoading.vue';
import AppBall from '@/components/AppBall.vue';
import AppButton from '@/components/AppButton.vue';

export default {
    name: 'HistoryDetails',
    components:{
        'app-circle-loading':  AppCircleLoading,
        'app-ball' : AppBall,
        'app-button':  AppButton,
    },
    data(){
        return{
            id: this.$route.params,
            selectedNums:this.$store.getters.GET_HISTORY_PLAYERNUMS,
            drawedNums:this.$store.getters.GET_HISTORY_DRAWEDNUMS,
            moneyWon:this.$store.getters.GET_HISTORY_MONEYWON,
            drawTime: this.$store.getters.GET_HISTORY_DRAWTIME,
            loading:true,
        }
    },
    methods:{
        goBack(){
            history.back()
        }
    },
    async created(){
        if (this.selectedNums.length < 5){
            if (this.$user){
                console.log("FIREBASE CALL")
                try {
                    const historyDetails = await getDoc(doc(getFirestore(), "users", this.$user.uid, "history", this.id.id));
                    this.selectedNums = (historyDetails.data().playerNums);
                    this.drawedNums = (historyDetails.data().drawNums);
                    this.moneyWon = (historyDetails.data().totalWon);
                    this.drawTime = (historyDetails.data().drawTime.toDate().toUTCString().split(' ').slice(0, 5).join(' '));
                } catch {
                    this.$router.push({ path: '/history' })
                }
            }
        }
        this.loading= false;
    },
    beforeDestroy(){
        this.$store.dispatch('REMOVE_HISTORYDETAILS');
    }
}
</script>

<style>

</style>