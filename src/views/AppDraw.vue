<template>
    <div class="relative" v-if="this.$store.getters.IS_LOGGEDIN">
        <div class="flex flex-col max-w-7xl w-11/12 mx-auto "> 
            <div class="bg-white rounded-md shadow-md py-5 px-3  md:px-24  my-5 flex flex-col">
                <div class="flex justify-between  ">
                    <div class="flex gap-2 flex-col">
                        <span class="mb-2 font-semibold text-lg">Drawed Number:</span>
                        <div class="grid grid-rows-1 grid-cols-1 grid-flow-row gap-y-8 align-middle self-center justify-items-center text-lg font-semibold">
                            <div v-for="num in drawedNums" :key="num" class="flex justify-center items-center">
                                <!-- <button class="app-ball cursor-default">
                                    {{ num }}
                                </button> -->
                                <app-ball :numProp="num" />
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2 flex-col">
                        <span class="mb-2 font-semibold text-lg">Your Number:</span>
                        <div class="grid grid-rows-1 grid-cols-1 grid-flow-row gap-y-8 align-middle self-center justify-items-center text-lg font-semibold">
                            <div v-for="num in selectedNums" :key="num"  class="flex justify-center items-center">
                                <app-ball :ref="`UserNums${num}`">
                                    <span class="underline decoration-gray-900">{{ num }}</span>
                                </app-ball>
                                <!-- <button :ref="`UserNums${num}`" class="app-ball cursor-default disabled:shadow-3d-match disabled:sm:shadow-3d-match-sm group ">
                                    <span class="underline decoration-gray-900 group-disabled:animate-spin ">{{ num }}</span>
                                </button> -->
                            </div>
                        </div>
                    </div>
                </div>
                <span class="my-2 font-semibold text-lg flex items-center justify-center">You have won: {{moneyWon}}</span>
            </div>
        </div>
        <app-modal :showModal="showModal" :moneyWon="this.moneyWon" :drawTime="this.currentTime"/>
    </div>
</template>

<script>
import AppModal from '../components/AppModal.vue'
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { mapGetters } from 'vuex';
import AppBall from '@/components/AppBall.vue';

export default {
    name: 'AppDraw',
    components: {
    'app-modal':  AppModal,
    'app-ball':  AppBall,
    },
    data() {
        return {
            selectedNums:[],
            drawedDiv:"Loading...",
            drawEnded:false,
            drawedNums:[],
            showModal:false,
            winningNum:0,
            moneyWon:0,
            currentTime:null,
        }
    },
    computed: {
    ...mapGetters(['GET_PLAYERNUMS','GET_CURRENTDRAWS'])
    },
    methods:{
        highlightDrawedNums(){
                this.drawedNums.forEach( (drawedNum) => {
                    if (this.selectedNums.includes(drawedNum)){
                        this.winningNum++
                        setTimeout(() => {
                            this.$refs["UserNums"+ drawedNum][0].$el.children[0].classList.add("animate-spin")
                            this.$refs["UserNums"+ drawedNum][0].$el.classList.value ="app-ball shadow-3d-match sm:shadow-3d-match-sm"
                        });
                        
                    }
                });
        },
        async startDrawn(){
            this.drawedDiv=""

            const delay = () => new Promise(resolve => {
                setTimeout(resolve, "100")
            });

            while (this.drawedNums.length < 5 && this.$user){
                    await delay()
                        .then(()=>{
                            var drawedNum = Math.ceil(Math.random() * (30-1) + 1)
                            while (this.drawedNums.includes(drawedNum)){
                                drawedNum =Math.ceil(Math.random() * (30-1) + 1)
                            }
                            if (this.selectedNums.includes(drawedNum)){
                                this.winningNum++
                                this.$refs["UserNums"+ drawedNum][0].$el.children[0].classList.add("animate-spin")
                                this.$refs["UserNums"+ drawedNum][0].$el.classList.value ="app-ball shadow-3d-match sm:shadow-3d-match-sm"
                            }
                            this.drawedNums.push(drawedNum);
                            this.$store.commit('ADD_CURRENTDRAW', this.drawedNums);

                            try {
                                setDoc(doc(getFirestore(), "users", this.$user.uid), {
                                    currentNums: this.$store.getters.GET_PLAYERNUMS,
                                    drawRunning: this.$store.getters.GET_DRAWINPROG,
                                    currentDraw: this.drawedNums,
                                },{ merge: true });
                            } catch (e) {
                                console.log("Error adding document: ", e);
                            }

                            this.checkWinningNums();
                        })
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
            if (this.$user){
                try {
                    await setDoc(doc(getFirestore(), "users", this.$user.uid), {
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
          this.$nextTick(function () {
            this.selectedNums = this.GET_PLAYERNUMS
            this.drawedNums = this.GET_CURRENTDRAWS
            if (this.drawedNums.length !== 0){
                this.highlightDrawedNums();
                this.startDrawn();
            }else{
                setTimeout(() => {
                    this.startDrawn();
                }, "100");
            }
        })
    },
}
</script>

<style>

</style>