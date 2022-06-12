<template>
  <div v-show="loadingProp" class="app-loading-circle"></div>
</template>

<script>
export default {
    props:{
        loadingProp:{
            loading:Boolean,
            default:true
        }
    }
}
</script>

<style>

</style>