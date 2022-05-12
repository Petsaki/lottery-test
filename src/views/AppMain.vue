<template>
    <div>
        <app-header/>
        <div class="flex flex-col max-w-7xl mx-auto py-5">
            <div class="flex flex-col md:flex-row">
            <div class="bg-white rounded-md shadow-md m-3 md:flex-[1_1_70%] py-5 px-3">
                <ul class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-y-6 sm:gap-y-8 align-middle self-center justify-items-center text-lg font-semibold">
                    <li v-for="index in 30" :key="index" >
                    <button @click="choosedNum(index)"  ref="boardNum" class="rounded-full disabled:cursor-default disabled:-translate-y-0 disabled:grayscale bg-gradient-to-br from-yellow-300 to-yellow-500 w-14 sm:w-24 font-bold text-gray-700 aspect-square flex justify-center items-center  cursor-pointer hover:-translate-y-1">{{ index }}</button>
                    </li>
                </ul>
            </div>
            <div ref="playerNums" class="md:flex-[1_1_30%] bg-white rounded-md shadow-md m-3 py-5 px-3">
                <ul class="grid grid-cols-4 sm:grid-cols-5 md:grid-rows-1 md:grid-cols-1 md:grid-flow-row gap-y-8 align-middle self-center justify-items-center text-lg font-semibold">
                    <li v-for="num in selectedNums" :key="num"  class="relative flex justify-center items-center">
                        
                        <button class="rounded-full shadow-sm bg-gradient-to-br from-yellow-300 to-yellow-500 w-14 sm:w-24 font-bold text-gray-700 aspect-square flex justify-center items-center cursor-default">
                            {{ num }}
                        </button>
                        <span tabindex=0 class="absolute -top-2 -right-4 md:-right-4 cursor-pointer" @click="removeNum(num)">&#10005;</span>
                    </li>
                </ul>
                
            </div>
            </div>
            <div class="flex flex-col-reverse md:flex-row">
    
            <div class="md:flex-[1_1_70%]">
                
            </div>
            <div ref="playerNums" class="md:flex-[1_1_30%] py-5 px-3 flex justify-center items-center">
                <button  >
                    <button v-if="showBtn" @click="goAtDraw" class=" bg-green-500 px-2 py-1 rounded-md text-lg font-semibold">Play!</button>
                        
                    </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

import AppHeader from '../components/AppHeader.vue';
import { setDoc, doc, getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
    name: 'AppMain',
    components: {
    'app-header':  AppHeader,
    },
    data() {
        return {
            selectedNums:[],
            showBtn: false,

        }
    },
    methods:{
        choosedNum(num){
            // Bug: I think it was some issue with the objects. it wants to make a spread operator or Object.assign
             this.$store.commit('UPDATE_TOAST',
                {show:false, msg:"", type:""}
            ); 
            console.log("clicked!", num)
             console.log(this.$refs.boardNum[num-1]);
             if (this.selectedNums.includes(num)) return
             if (this.selectedNums.length < 5){
                 this.$refs.boardNum[num-1].disabled = true;
                 console.log("MPHKA EDWWWW")
                this.selectedNums.push(num);
                if (this.selectedNums.length === 5){
                    this.showBtn = true;
                } 
                sessionStorage.setItem('selectedNums', JSON.stringify(this.selectedNums));
                this.$store.commit('UPDATE_PLAYERNUMS',this.selectedNums)
                console.log("EDWWWWWWWWWWWW",this.$store.state.userData.playerNums)
                console.log(this.selectedNums)
                return;
             }
             console.log("only 5 num pls")
             this.$store.commit('UPDATE_TOAST',
                {show:true, msg:"Only 5 numbers you can choose!", type:"warning"}
            );    
             
        },
        removeNum(num){
            this.$store.commit('UPDATE_TOAST',
                {show:false, msg:"", type:""}
            );
            console.log("MPHKA")
            this.showBtn = false;
            this.selectedNums = this.selectedNums.filter(arrayNum => arrayNum !== num);
            sessionStorage.setItem('selectedNums', JSON.stringify(this.selectedNums));
            this.$store.commit('UPDATE_PLAYERNUMS',this.selectedNums)
            this.$refs.boardNum[num-1].disabled = false;
        },
        goAtDraw(){
            this.$root.$emit('headerComponent')
        }
    },

    created(){
                this.selectedNums= this.$store.getters.playerNums
                if (this.selectedNums.length === 5){
                    this.showBtn = true;
                } 
                console.log(this.selectedNums);

    },
    mounted(){
        this.selectedNums.map((num)=>{
            this.$refs.boardNum[num-1].disabled = true;
        })
    },

    beforeDestroy(){
        const auth = getAuth();
        const user = auth.currentUser;
        if (user){
            try {
                setDoc(doc(getFirestore(), "users", user.uid), {
                    currentNums: this.$store.getters.playerNums,
                    drawRunning: this.$store.getters.getDrawInProg,
                },{ merge: true });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }

}
</script>

<style>

</style>