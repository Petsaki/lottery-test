<template>
    <div v-if="this.$store.getters.IS_LOGGEDIN">
        <div class="flex flex-col items-center py-7">
            <h1 class="text-xl font-bold ">Your History:</h1>
            <ul class="m-5 w-full flex flex-col items-center">
                <div  v-show="loading"  class="app-loading-circle"></div>
                <div v-if="emptyHistory">
                    You don't have previous games at history :/
                </div>
                <li v-for="(num, index) in selectedNums" :key="index" class="pb-4 max-w-lg w-11/12">

                    <div class="relative">
                        <router-link :to="'/history/' + docsID[index]" tabindex=0 class="relative bg-white py-4 px-2 sm:p-4 rounded-md shadow-md flex flex-col items-center justify-items-start ">

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
                        </router-link>
                        <span tabindex=0 class="absolute top-0 right-2  cursor-pointer " @click="removeDrawHistory(index)">&#10005;</span>
                    </div>
                </li>
                <div @click="goAtTop" v-show="!loading" class="cursor-pointer underline font-semibold">Go at top</div>
            </ul>
        </div>
    </div>
</template>

<script>

import { getFirestore, getDocs, collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
    name: 'AppHistory',
    data(){
        return{
            selectedNums:[],
            drawedNums:[],
            moneyWon:[],
            drawTime: [],
            docsID:[],
            emptyHistory:false,
            loading:false,
        }
    },
    methods:{
        async removeDrawHistory(index){
        const auth = getAuth();
        const user = auth.currentUser;
        if (user){
            try {
                await deleteDoc(doc(getFirestore(), "users", user.uid,"history",this.docsID[index]));
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
        }
    },

    async created(){
        const auth = getAuth();
        const user = auth.currentUser;
        if (user){
            this.loading=true;
            console.log("Call to firebase")
            try {
                const q = query(collection(getFirestore(), "users", user.uid,"history"),orderBy("drawTime", "desc"))
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
            }
            this.selectedNums.length === 0 ? this.emptyHistory = true : this.emptyHistory = false
            console.log("selectedNums ", this.selectedNums.length == 0)
        }
    }
}
</script>

<style>

</style>