<template >
    <div v-if="this.$store.getters.IS_LOGGEDIN">
        <div class="flex flex-col max-w-7xl mx-auto py-5">
            <div class="flex flex-col md:flex-row">
                <div class="bg-white rounded-md shadow-md m-3 md:flex-[1_1_70%] py-5 px-3">
                    <div class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-y-6 sm:gap-y-8 align-middle self-center justify-items-center font-semibold">
                        <div v-for="index in 30" :key="index" >
                            <!-- <div @click="choosedNum(index)" tabindex="0" :ref="`boardNum${index}`" class="app-ball-actived">{{ index }}</div> -->
                            <base-ball @click.native="choosedNum(index)" :ref="`boardNum${index}`" class="app-ball cursor-pointer hover:scale-105" :numProp="index"/>
                        </div>
                    </div>
                </div>
                <div :class="[selectedNums.length > 0 ? 'block' : 'hidden md:block']" ref="playerNums" class="md:flex-[1_1_30%] bg-white rounded-md shadow-md m-3 py-5 px-3">
                    <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-rows-1 md:grid-cols-1 md:grid-flow-row gap-y-8 align-middle self-center justify-items-center text-lg font-semibold">
                        <div v-for="num in selectedNums" :key="num"  class="relative flex justify-center items-center">
                            <base-ball class="app-ball" :numProp="num"/>
                            <span tabindex=0 class="absolute -top-2 -right-2 cursor-pointer text-sm sm:text-base text-gray-900" @click="removeNum(num)" @keypress.enter="removeNum(num)">&#10005;</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col-reverse md:flex-row">
    
                <div class="md:flex-[1_1_70%]">
                
                </div>
                <div  ref="playerNums" class="md:flex-[1_1_30%] relative py-5 px-3 flex justify-start gap-5 items-center text-white flex-wrap xl:flex-nowrap">
                    <base-button @click.native="addRandomNums" class="bg-blue-700 flex justify-start items-start relative group after:absolute after:cursor-default after:pointer-events-none outline-none focus-visible:outline-black focus-visible:outline-2 
                        after:content-['It_will_fill_the_remaining_numbers.'] after:text-white  after:w-full after:h-full after:text-sm  after:bg-gray-600/80 after:-translate-y-[123%] after:py-5 after:px-[2px] after:top-0 after:rounded-md after:flex after:justify-center after:items-center after:whitespace-pre-wrap after:right-1/2 after:translate-x-1/2
                        before:content[''] before:absolute  before:right-1/2 before:translate-x-1/2 before:bg-transparent before:cursor-default before:top-0 before:pointer-events-none before:-translate-y-[120%] before:border-r-8 before:border-l-8 before:border-t-8 before:border-r-transparent before:border-l-transparent before:border-t-gray-600/80
                        after:delay-[.15s] hover:after:delay-500 focus-visible:after:delay-500 after:transition-opacity after:opacity-0 hover:after:opacity-100 focus-visible:after:opacity-100
                        before:delay-[.15s] hover:before:delay-500 focus-visible:before:delay-500 before:transition-opacity before:opacity-0 hover:before:opacity-100 focus-visible:before:opacity-100">
                        Random Numbers
                    </base-button>
                    <base-button v-show="this.selectedNums.length" @click.native="clearSelectedNums" class="bg-blue-700">
                        Clear all
                    </base-button>
                    <base-button v-if="showBtn" @click.native="goAtDraw" class="bg-orange-500 xl::absolute right-5">
                        Play!
                    </base-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseBall from '@/components/BaseBall.vue';

import BaseButton from '../components/BaseButton.vue';

export default {
    name: 'AppHome',
    components: {
    'base-button':  BaseButton,
    'base-ball':  BaseBall,
    },
    data() {
        return {
            selectedNums:[],
            showBtn: false,
        }
    },
    methods:{
        choosedNum(num){
            if (this.selectedNums.includes(num)) return
            // Bug: I think it was some issue with the objects. it wants to make a spread operator or Object.assign
            this.$store.dispatch('SET_TOAST',{
                show:false,
                msg:"",
                type:""
            }) 
            
            

            if (this.selectedNums.length < 5){
                this.$refs["boardNum"+ num][0].$el.classList.value = "app-ball grayscale";
                
                this.selectedNums.push(num);
                if (this.selectedNums.length === 5){
                    this.showBtn = true;
                } 
                this.$store.commit('ADD_PLAYERNUMS',this.selectedNums)
                return;
            }
            setTimeout(() => {
                this.$store.dispatch('SET_TOAST',{
                    show:true,
                    msg:"Only 5 numbers you can choose!",
                    type:"warning"
                }) 
                
            },100);
        },
        removeNum(num){
            this.$store.dispatch('SET_TOAST',{
                show:false,
                msg:"",
                type:""
            }) 
            this.showBtn = false;
            this.selectedNums = this.selectedNums.filter(arrayNum => arrayNum !== num);
            this.$store.commit('ADD_PLAYERNUMS',this.selectedNums)
            this.$refs["boardNum"+ num][0].$el.classList.value = "app-ball cursor-pointer hover:scale-105";
            
        },
        goAtDraw(){
            this.$root.$emit('headerComponent')
        },
        addRandomNums(){
            while (this.selectedNums.length < 5){
                var drawedNum = Math.ceil(Math.random() * (30-1) + 1);
                while (this.selectedNums.includes(drawedNum)){
                    drawedNum =Math.ceil(Math.random() * (30-1) + 1)
                }
                this.choosedNum(drawedNum);
            }
        },
        clearSelectedNums(){
            while (this.selectedNums.length){
                this.removeNum(this.selectedNums.pop())
            }
        },
    },
    created(){
        this.selectedNums= this.$store.getters.GET_PLAYERNUMS
        if (this.selectedNums !== null && this.selectedNums.length === 5){
            this.showBtn = true;
        } 
    },
    mounted(){
        this.$nextTick(function () {
            if (this.$store.getters.GET_DRAWINPROG){
                this.$router.push({ path: '/liveDraw' })
            }
            if (this.selectedNums){
                this.selectedNums.map((num)=>{
                    this.$refs["boardNum"+ num][0].$el.classList.value = "app-ball grayscale";
                })
            }
        })
    },
}
</script>

<style>

</style>