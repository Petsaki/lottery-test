<template>
  <div class="relative" v-if="this.$store.getters.loggedIn">
      <div class="flex flex-col max-w-7xl w-11/12 mx-auto "> 
      <div class="bg-white rounded-md shadow-md py-5 px-3  md:px-24 flex flex-row justify-between   my-5">
            <div class="flex gap-2 flex-col"> 
                <span class="mb-2 font-semibold text-lg">Drawed Number:</span>
                <ul class="grid grid-rows-1 grid-cols-1 grid-flow-row gap-y-8 align-middle self-center justify-items-center text-lg font-semibold">
                    <li v-for="num in drawedNums" :key="num" class="flex justify-center items-center">
                        
                        <button class="rounded-full shadow-sm bg-gradient-to-br from-yellow-300 to-yellow-500 w-20 md:w-24 font-bold text-gray-700 aspect-square flex justify-center items-center cursor-default">
                            {{ num }}
                        </button>
                    </li>
                </ul>
            </div>
            <div class="flex gap-2 flex-col">
                <span class="mb-2 font-semibold text-lg">Your Number:</span>
                <ul class="grid grid-rows-1 grid-cols-1 grid-flow-row gap-y-8 align-middle self-center justify-items-center text-lg font-semibold">
                    <li v-for="num in selectedNums" :key="num"  class="flex justify-center items-center">
                        
                        <button :ref="'UserNums' + num" class="rounded-full underline decoration-gray-700 shadow-sm bg-gradient-to-br from-yellow-300 to-yellow-500 w-20 md:w-24 font-bold text-gray-700 aspect-square flex justify-center items-center cursor-default disabled:from-green-300 disabled:to-green-500 disabled:animate-spin">
                            {{ num }}
                        </button>
                    </li>
                </ul>
                <span class="mb-2 font-semibold text-lg">You have won: {{moneyWon}}</span>
            </div>
                
        </div>
      </div>

    <app-modal v-if="showModal" :moneyWon="this.moneyWon" :drawTime="this.currentTime"/>
  </div>
</template>

<script>
import AppModal from '../components/AppModal.vue'
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { mapGetters } from 'vuex';
export default {
    name: 'AppDraw',
    components: {
    'app-modal':  AppModal,
    },
    data() {
        return {
            selectedNums:this.watchPlayerNums,
            drawedDiv:"Loading...",
            drawEnded:false,
            drawedNums:this.watchCurrentDraw,
            showModal:false,
            winningNum:0,
            moneyWon:0,
            currentTime:null,

        }
    },
    computed: {
    ...mapGetters(['playerNums','getCurrentDraw'])
    },
    watch: {
        watchPlayerNums() {
            this.selectedNums = this.playerNums
            
        },
       watchCurrentDraw() {
            this.drawedNums = this.getCurrentDraw
        },
    },
    methods:{
        async startDrawn(){
            this.drawedDiv=""

            console.log("ETREXAAAAAAAAAAAAAAAAAAAAAAA")
            console.log(this.drawedNums.length)
            console.log(this.selectedNums.length)
            if (this.drawedNums.length !== 0){
                this.drawedNums.forEach( (drawedNum) => {
                if (this.selectedNums.includes(drawedNum)){
                    this.winningNum++
                    console.log(this.$refs["UserNums"+ drawedNum]);
                    this.$refs["UserNums"+ drawedNum][0].disabled = true;
                    console.log("PETIXES TO NOYMERO: ", drawedNum)
                }
                });
            }

            const delay = () => new Promise(resolve => {
                setTimeout(resolve, "2000")});

                const numsToDraw = this.drawedNums.length ? 5 - this.drawedNums.length : 5;
                console.log(numsToDraw);

                for (let i = 0; i < numsToDraw; i++) {
                    console.log("EDW -3")
                        const auth = getAuth();
                        const user = auth.currentUser;
                        if (user){
                            console.log("EDW -2")
                            await delay()
                        .then(()=>{
                            console.log("EDW -1")
                        var drawedNum = Math.ceil(Math.random() * (30-1) + 1)
                        while (this.drawedNums.includes(drawedNum)){
                            drawedNum =Math.ceil(Math.random() * (30-1) + 1)
                        }
                        console.log("EDW 1")
                        if (this.selectedNums.includes(drawedNum) && !this.$refs["UserNums"+ drawedNum][0].disabled){
                            console.log("EDW 2")
                            this.winningNum++
                            console.log(this.$refs["UserNums"+ drawedNum]);
                            this.$refs["UserNums"+ drawedNum][0].disabled = true;
                            console.log("PETIXES TO NOYMERO: ", drawedNum)
                        }
                        console.log("EDW 3")
                        this.drawedNums.push(drawedNum);
                        this.$store.commit('UPDATE_CURRENTDRAW', this.drawedNums);
                        const auth = getAuth();
                        const user = auth.currentUser;
                        
                            console.log("MPHKA EDW MPHKA EDW MPHKA EDW")
                            try {
                                setDoc(doc(getFirestore(), "users", user.uid), {
                                    currentNums: this.$store.getters.playerNums,
                                    drawRunning: this.$store.getters.getDrawInProg,
                                    currentDraw: this.drawedNums,
                                });
                            } catch (e) {
                                console.log("Error adding document: ", e);
                                console.log("or user logged out");
                            }

                        this.checkWinningNums();
                        console.log(this.moneyWon)
                    })
                        }else{
                            console.log("EDW 4")
                            return;
                        }
 
                    console.log(this.drawedNums)

                }
                console.log("TELEIWSA--------------------------")
                if (this.drawedNums.length === 5){
                    this.currentTime = new Date();
                    console.log(this.currentTime.toLocaleString())
                    console.log(this.winningNum)
                    this.showModal=true;
                    sessionStorage.removeItem("selectedNums")
                    this.$store.commit('UPDATE_DRAWINPROG',false);
                    this.updateDrawingDB();
                }

        },
        checkWinningNums(){
            switch(this.winningNum) {
            case 3:
                this.moneyWon = 5
                break;
            case 4:
                this.moneyWon = 10
                break;
            case 5:
                this.moneyWon = 20
                break;
            default:
                this.moneyWon = 0;
            }
        },
        async updateDrawingDB(){
            const auth = getAuth();
            const user = auth.currentUser;
            if (user){
                try {
                    await setDoc(doc(getFirestore(), "users", user.uid), {
                    drawRunning: this.$store.getters.getDrawInProg,
                    currentNums:[],
                    currentDraw:[],
                    
                },{ merge: true });
                // Sto telos edw mporw na balw ,{ merge: true } (meta apo to }) kai na mhn kanei overwrite
                } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        },
    },
    mounted(){
        this.selectedNums = this.playerNums
        this.drawedNums = this.getCurrentDraw
    setTimeout(() => {
        this.startDrawn();
    }, "500");

    },
}
</script>

<style>

</style>