<template>
    <div class="flex flex-col items-center text-center gap-2">
        <label :class="classProp">{{labelProp}} </label>
        <slot/>
    </div>
</template>

<script>
export default {
    props:{
        labelProp:{
            text:String,
        },
        classProp:{
            type:String,
        },

    }

}
</script>

<style>

</style>