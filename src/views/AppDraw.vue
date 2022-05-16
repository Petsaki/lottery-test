<template>
    <div class="relative" v-if="this.$store.getters.IS_LOGGEDIN">
        <div class="flex flex-col max-w-7xl w-11/12 mx-auto "> 
            <div class="bg-white rounded-md shadow-md py-5 px-3  md:px-24  my-5 flex flex-col">
                <div class="flex justify-between  ">
                    <div class="flex gap-2 flex-col">
                        <span class="mb-2 font-semibold text-lg">Drawed Number:</span>
                        <ul class="grid grid-rows-1 grid-cols-1 grid-flow-row gap-y-8 align-middle self-center justify-items-center text-lg font-semibold">
                            <li v-for="num in drawedNums" :key="num" class="flex justify-center items-center">
                                <button class="app-ball cursor-default">
                                    {{ num }}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="flex gap-2 flex-col">
                        <span class="mb-2 font-semibold text-lg">Your Number:</span>
                        <ul class="grid grid-rows-1 grid-cols-1 grid-flow-row gap-y-8 align-middle self-center justify-items-center text-lg font-semibold">
                            <li v-for="num in selectedNums" :key="num"  class="flex justify-center items-center">
                        
                                <button :ref="'UserNums' + num" class="app-ball cursor-default disabled:shadow-3d-match disabled:sm:shadow-3d-match-sm group ">
                                    <span class="underline decoration-gray-700 group-disabled:animate-spin ">{{ num }}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <span class="my-2 font-semibold text-lg flex items-center justify-center">You have won: {{moneyWon}}</span>
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
    ...mapGetters(['GET_PLAYERNUMS','GET_CURRENTDRAWS'])
    },
    watch: {
        watchPlayerNums() {
            this.selectedNums = this.GET_PLAYERNUMS
        },
        watchCurrentDraw() {
            this.drawedNums = this.GET_CURRENTDRAWS
        },
    },
    methods:{
        async startDrawn(){
            this.drawedDiv=""
            if (this.drawedNums.length !== 0){
                this.drawedNums.forEach( (drawedNum) => {
                    if (this.selectedNums.includes(drawedNum)){
                        this.winningNum++
                        this.$refs["UserNums"+ drawedNum][0].disabled = true;
                    }
                });
            }

            const delay = () => new Promise(resolve => {
                setTimeout(resolve, "4000")
            });

            const numsToDraw = this.drawedNums.length ? 5 - this.drawedNums.length : 5;

            for (let i = 0; i < numsToDraw; i++) {
                const auth = getAuth();
                const user = auth.currentUser;
                if (user){
                    await delay()
                        .then(()=>{
                            var drawedNum = Math.ceil(Math.random() * (30-1) + 1)
                            while (this.drawedNums.includes(drawedNum)){
                                drawedNum =Math.ceil(Math.random() * (30-1) + 1)
                            }
                            if (this.selectedNums.includes(drawedNum) && !this.$refs["UserNums"+ drawedNum][0].disabled){
                                this.winningNum++
                                this.$refs["UserNums"+ drawedNum][0].disabled = true;
                            }
                            this.drawedNums.push(drawedNum);
                            this.$store.commit('ADD_CURRENTDRAW', this.drawedNums);
                            const auth = getAuth();
                            const user = auth.currentUser;
                    
                            try {
                                setDoc(doc(getFirestore(), "users", user.uid), {
                                    currentNums: this.$store.getters.GET_PLAYERNUMS,
                                    drawRunning: this.$store.getters.GET_DRAWINPROG,
                                    currentDraw: this.drawedNums,
                                },{ merge: true });
                            } catch (e) {
                                console.log("Error adding document: ", e);
                            }

                            this.checkWinningNums();
                        })
                }else{
                    return;
                }
            }
            if (this.drawedNums.length === 5){
                this.currentTime = new Date();
                this.showModal=true;
                this.$store.commit('SET_DRAWINPROG',false);
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
                        drawRunning: this.$store.getters.GET_DRAWINPROG,
                        currentNums:[],
                        currentDraw:[],
                    },{ merge: true });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        },
    },
    mounted(){
        this.selectedNums = this.GET_PLAYERNUMS
        this.drawedNums = this.GET_CURRENTDRAWS
        setTimeout(() => {
            this.startDrawn();
        }, "3000");
    },
}
</script>

<style>

</style>