<template>
      <div class = "z-30 dark:shadow-none rounded-md shadow-md shadow-slate-500/80 bottom-5 left-3 right-3 sm:left-5 py-2 px-5 sm:w-80
       text-white after:content-['✕'] after:absolute after:top-1 after:right-3 after:cursor-pointer
       animate-toastAniSM sm:animate-toastAniMD"
      :class="[setDisplay ? 'fixed' : 'hidden', type === 'success' ? 'bg-green-500' : 'bg-red-600' ]"
       @click="setDisplay = false">
        <h2 class='text-lg font-semibold first-letter:uppercase'>{{type}}</h2>
        <span>{{msg}}</span>
    </div>
</template>

<script>
export default {
    name: 'AppToast',
    props:{
        type:String,
        msg:String,
    },
    data() {
        return {
            setDisplay: true,

        }
    },
    created(){
        setTimeout(() => this.setDisplay=false,4000);
    },
}
</script>

<style>

</style>