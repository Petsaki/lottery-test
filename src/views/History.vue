<template>
    <div v-if="this.$store.getters.IS_LOGGEDIN">
        <div class="flex flex-col items-center py-7 max-w-7xl mx-auto">
            <h1 class="text-xl font-bold ">Your History:</h1>
            <div class="m-5 w-full flex flex-col gap-2 justify-center items-center ">
                <circle-loading :loadingProp="loading"/>
                <div v-if="emptyHistory">
                    You don't have previous games at history :/
                </div>
                <div v-for="(num, index) in selectedNums" :key="index" class="mb-2 bg-white odd:bg-zinc-100 rounded-md shadow-md max-w-lg w-11/12">

                    <div class="relative">
                        <span
                            @click="historyDetails(selectedNums[index],drawedNums[index],moneyWon[index],drawTime[index].toDate().toUTCString().split(' ').slice(0, 5).join(' '),docsID[index])"
                            tabindex=0 
                            class="relative py-4 px-2 sm:p-4  flex flex-col items-center justify-items-start cursor-pointer">

                            <div class="flex w-full gap-1">
                                <span class="font-semibold flex-1 flex justify-end items-center text-right">Draw date:</span>
                                <div class="flex-1 flex justify-start items-center">{{drawTime[index].toDate().toUTCString().split(' ').slice(0, 5).join(' ')}}</div>  
                            </div>
                            <div class="flex w-full gap-1">
                                <span class="font-semibold flex-1 flex justify-end items-center text-right">User's numbers:</span> 
                                <div class="flex-1 flex justify-start items-center">{{num ? num.join(', ') : ""}}</div> 
                            </div>
                            <div class="flex w-full gap-1">
                                <span class="font-semibold flex-1 flex justify-end items-center text-right">Drawed Numbers:</span> 
                                <div class="flex-1 flex justify-start items-center">{{drawedNums[index] ? drawedNums[index].join(', ') : ""}}</div>
                            </div>
                            <div class="flex w-full gap-1">
                                <span class="font-semibold flex-1 flex justify-end items-center text-right">Money won:</span>
                                <div class="flex-1 flex justify-start items-center">{{moneyWon[index] > 0 ? moneyWon[index] : '-'}}</div> 
                            </div>
                        </span>
                        <span tabindex=0 class="absolute top-0 right-2  cursor-pointer " @click="removeDrawHistory(index)">&#10005;</span>
                    </div>
                </div>
            </div>
            <div @click="goAtTop" v-show="!loading && this.selectedNums.length > 6" class="cursor-pointer underline font-semibold">Go at top</div>
        </div>
    </div>
</template>

<script>

import { getFirestore, getDocs, collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import CircleLoading from '@/components/CircleLoading.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'AppHistory',
    components:{
        'circle-loading':  CircleLoading,
    },
    data(){
        return{
            selectedNums:[],
            drawedNums:[],
            moneyWon:[],
            drawTime: [],
            docsID:[],
            emptyHistory:false,
            loading:false,
            updateHistory: false,
        }
    },
    computed: {
    ...mapGetters(['GET_UPDATE_HISTORY'])
    },
    methods:{
        async removeDrawHistory(index){
        if (this.$user){
            try {
                await deleteDoc(doc(getFirestore(), "users", this.$user.uid,"history",this.docsID[index]));
                this.selectedNums.splice(index, 1);
                this.drawedNums.splice(index, 1);
                this.moneyWon.splice(index, 1);
                this.drawTime.splice(index, 1);
                this.docsID.splice(index, 1);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        this.selectedNums.length === 0 ? this.emptyHistory = true : this.emptyHistory = false
        },
        goAtTop(){
            window.scrollTo({top: 0, behavior: 'smooth'});
        },
        historyDetails(selectedNums,drawedNums,moneyWon,drawTime,docsID){
            this.$store.dispatch('SET_HISTORYDETAILS',{
                selectedNums:selectedNums,
                drawedNums:drawedNums,
                moneyWon:moneyWon,
                drawTime:drawTime,
            })
            this.$router.push({ path: '/history/' + docsID })
        },
        async getHistoryData(){
            if (this.$user){
                this.loading=true;
                this.selectedNums = [];
                this.drawedNums = [];
                this.moneyWon = [];
                this.drawTime = [];
                this.docsID = [];
                try {
                    const q = query(collection(getFirestore(), "users", this.$user.uid,"history"),orderBy("drawTime", "desc"))
                    const userHistory = await getDocs(q);
                    userHistory.forEach((doc) => {
                        this.selectedNums.push(doc.data().playerNums);
                        this.drawedNums.push(doc.data().drawNums);
                        this.moneyWon.push(doc.data().totalWon);
                        this.drawTime.push(doc.data().drawTime);
                        this.docsID.push(doc.id);
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }finally{
                    this.loading=false;
                    this.$store.commit('SET_UPDATEHISTORY',false)
                }
                this.selectedNums.length === 0 ? this.emptyHistory = true : this.emptyHistory = false
            }
        },
    },
    created(){
        this.getHistoryData()
    },
    activated(){
        if (this.GET_UPDATE_HISTORY){
            this.getHistoryData()
        }
    }
}
</script>

<style>

</style>