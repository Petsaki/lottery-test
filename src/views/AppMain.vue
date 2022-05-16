<template >
    <div v-if="this.$store.getters.IS_LOGGEDIN">
        <div class="flex flex-col max-w-7xl mx-auto py-5">
            <div class="flex flex-col md:flex-row">
                <div class="bg-white rounded-md shadow-md m-3 md:flex-[1_1_70%] py-5 px-3">
                    <ul class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-y-6 sm:gap-y-8 align-middle self-center justify-items-center font-semibold">
                        <li v-for="index in 30" :key="index" >
                            <button @click="choosedNum(index)"  ref="boardNum" class="app-ball disabled:cursor-default disabled:grayscale hover:scale-105 disabled:scale-100">{{ index }}</button>
                        </li>
                    </ul>
                </div>
                <div :class="[selectedNums.length > 0 ? 'block' : 'hidden md:block']" ref="playerNums" class="md:flex-[1_1_30%] bg-white rounded-md shadow-md m-3 py-5 px-3">
                    <ul class="grid grid-cols-4 sm:grid-cols-5 md:grid-rows-1 md:grid-cols-1 md:grid-flow-row gap-y-8 align-middle self-center justify-items-center text-lg font-semibold">
                        <li v-for="num in selectedNums" :key="num"  class="relative flex justify-center items-center">
                        
                            <button class="app-ball cursor-default">
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
                <div  ref="playerNums" class="md:flex-[1_1_30%] py-5 px-3 flex justify-center items-center">
                    <button v-if="showBtn" @click="goAtDraw" class="app-btn bg-orange-500 text-white">Play!</button>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>

export default {
    name: 'AppMain',
    data() {
        return {
            selectedNums:[],
            showBtn: false,
        }
    },
    methods:{
        choosedNum(num){
            // Bug: I think it was some issue with the objects. it wants to make a spread operator or Object.assign
            this.$store.dispatch('SET_TOAST',{
                show:false,
                msg:"",
                type:""
            }) 
            
            if (this.selectedNums.includes(num)) return

            if (this.selectedNums.length < 5){
                this.$refs.boardNum[num-1].disabled = true;
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
            this.$refs.boardNum[num-1].disabled = false;
        },
        goAtDraw(){
            this.$root.$emit('headerComponent')
        }
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
                    this.$refs.boardNum[num-1].disabled = true;
                })
            }
        })
    },
}
</script>

<style>

</style>